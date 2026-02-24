export type RealtimeSubscribeStatus =
  | "SUBSCRIBED"
  | "TIMED_OUT"
  | "CHANNEL_ERROR"
  | "CLOSED"
  | string;

type RealtimeRecoveryOptions = {
  onRecover: () => void | Promise<void>;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  jitterRatio?: number;
};

export type RealtimeRecoveryController = {
  handleStatus: (status: RealtimeSubscribeStatus) => void;
  schedule: () => void;
  reset: () => void;
  dispose: () => void;
};

const FAILURE_STATES = new Set<RealtimeSubscribeStatus>([
  "TIMED_OUT",
  "CHANNEL_ERROR",
  "CLOSED",
]);

export function createRealtimeRecoveryController({
  onRecover,
  initialDelayMs = 1000,
  maxDelayMs = 10000,
  backoffMultiplier = 2,
  jitterRatio = 0.2,
}: RealtimeRecoveryOptions): RealtimeRecoveryController {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let attempt = 0;
  let disposed = false;

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const reset = () => {
    attempt = 0;
    clearTimer();
  };

  const schedule = () => {
    if (disposed || timer) {
      return;
    }

    const exponentialDelay = Math.min(
      Math.round(initialDelayMs * Math.pow(backoffMultiplier, attempt)),
      maxDelayMs
    );
    const jitter = Math.round(exponentialDelay * jitterRatio * Math.random());
    const delay = Math.min(exponentialDelay + jitter, maxDelayMs);
    attempt += 1;

    timer = setTimeout(() => {
      timer = null;
      if (disposed) {
        return;
      }

      void Promise.resolve(onRecover()).catch(() => {
        schedule();
      });
    }, delay);
  };

  const handleStatus = (status: RealtimeSubscribeStatus) => {
    if (status === "SUBSCRIBED") {
      reset();
      return;
    }

    if (FAILURE_STATES.has(status)) {
      schedule();
    }
  };

  const dispose = () => {
    disposed = true;
    clearTimer();
  };

  return {
    handleStatus,
    schedule,
    reset,
    dispose,
  };
}
