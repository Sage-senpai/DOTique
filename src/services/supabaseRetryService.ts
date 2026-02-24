import { withRetry, type RetryOptions } from "./retryService";

class NonRetryableSupabaseError extends Error {
  original: unknown;

  constructor(original: unknown) {
    super("Non-retryable Supabase operation error");
    this.original = original;
  }
}

function asErrorMessage(error: unknown): string {
  if (!error) return "";
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && "message" in error) {
    return String((error as { message?: unknown }).message ?? "");
  }
  return String(error);
}

export function isTransientSupabaseError(error: unknown): boolean {
  const message = asErrorMessage(error).toLowerCase();
  return (
    message.includes("failed to fetch") ||
    message.includes("network") ||
    message.includes("timeout") ||
    message.includes("connection") ||
    message.includes("temporar")
  );
}

export async function executeSupabase<T>(
  operation: () => Promise<{ data: T; error: unknown }>,
  options: RetryOptions = {}
): Promise<T> {
  return withRetry(
    async () => {
      const { data, error } = await operation();
      if (error) {
        if (isTransientSupabaseError(error)) {
          throw error;
        }
        throw new NonRetryableSupabaseError(error);
      }
      return data;
    },
    {
      retries: options.retries ?? 2,
      initialDelayMs: options.initialDelayMs,
      backoffMultiplier: options.backoffMultiplier,
      maxDelayMs: options.maxDelayMs,
      shouldRetry: (error, attempt) => {
        if (error instanceof NonRetryableSupabaseError) {
          return false;
        }
        if (typeof options.shouldRetry === "function") {
          return options.shouldRetry(error, attempt);
        }
        return isTransientSupabaseError(error);
      },
    }
  ).catch((error) => {
    if (error instanceof NonRetryableSupabaseError) {
      throw error.original;
    }
    throw error;
  });
}

