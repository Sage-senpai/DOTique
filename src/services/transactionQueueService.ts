export type MintTransactionStatus = "pending" | "in-block" | "finalized" | "failed";

export interface MintTransactionState {
  id: string;
  status: MintTransactionStatus;
  attempt: number;
  maxRetries: number;
  txHash?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

type StateListener = (state: MintTransactionState) => void;

class TransactionQueueService {
  private transactions = new Map<string, MintTransactionState>();
  private listeners = new Set<StateListener>();

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getTransaction(id: string): MintTransactionState | null {
    return this.transactions.get(id) || null;
  }

  private emit(state: MintTransactionState) {
    this.transactions.set(state.id, state);
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  private update(
    id: string,
    patch: Partial<Omit<MintTransactionState, "id" | "createdAt">>
  ): MintTransactionState {
    const current = this.transactions.get(id);
    if (!current) {
      throw new Error(`Unknown transaction id: ${id}`);
    }

    const next: MintTransactionState = {
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    this.emit(next);
    return next;
  }

  async runMint<T extends { txHash?: string }>(
    executor: () => Promise<T>,
    maxRetries = 3
  ): Promise<{ queueId: string; result: T; finalState: MintTransactionState }> {
    const queueId = `mint_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const initialState: MintTransactionState = {
      id: queueId,
      status: "pending",
      attempt: 0,
      maxRetries,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.emit(initialState);

    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      this.update(queueId, { attempt, status: "pending", error: undefined });

      try {
        const result = await executor();

        this.update(queueId, {
          status: "in-block",
          txHash: result.txHash,
        });

        await new Promise((resolve) => setTimeout(resolve, 100));

        const finalState = this.update(queueId, {
          status: "finalized",
          txHash: result.txHash,
        });

        return { queueId, result, finalState };
      } catch (err) {
        lastError = err;
      }
    }

    const failedState = this.update(queueId, {
      status: "failed",
      error: lastError instanceof Error ? lastError.message : "Mint failed",
    });

    throw Object.assign(
      new Error(failedState.error || "Mint failed"),
      { queueId, finalState: failedState }
    );
  }
}

export const transactionQueueService = new TransactionQueueService();
