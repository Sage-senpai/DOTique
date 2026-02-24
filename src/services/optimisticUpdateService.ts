type OptimisticMutationOptions<TSnapshot> = {
  applyOptimistic: () => TSnapshot;
  commit: () => Promise<void>;
  rollback: (snapshot: TSnapshot) => void;
  onError?: (error: unknown) => void;
};

export async function runOptimisticMutation<TSnapshot>({
  applyOptimistic,
  commit,
  rollback,
  onError,
}: OptimisticMutationOptions<TSnapshot>): Promise<void> {
  const snapshot = applyOptimistic();

  try {
    await commit();
  } catch (error) {
    rollback(snapshot);
    onError?.(error);
    throw error;
  }
}

