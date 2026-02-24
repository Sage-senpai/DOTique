export type RetryOptions = {
  retries?: number;
  initialDelayMs?: number;
  backoffMultiplier?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  {
    retries = 2,
    initialDelayMs = 300,
    backoffMultiplier = 2,
    maxDelayMs = 5000,
    shouldRetry = () => true,
  }: RetryOptions = {}
): Promise<T> {
  let delayMs = initialDelayMs;
  let attempt = 0;

  // `retries` is additional attempts after the first try.
  const maxAttempts = retries + 1;

  while (attempt < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      attempt += 1;
      const canRetry = attempt < maxAttempts && shouldRetry(error, attempt);
      if (!canRetry) {
        throw error;
      }

      await sleep(delayMs);
      delayMs = Math.min(Math.ceil(delayMs * backoffMultiplier), maxDelayMs);
    }
  }

  throw new Error("Retry operation exited unexpectedly.");
}

