type ErrorContext = Record<string, unknown>;

let globalHandlersInitialized = false;

export function reportError(error: unknown, context: ErrorContext = {}) {
  const normalizedError = error instanceof Error ? error : new Error(String(error));
  console.error("DOTique runtime error", {
    message: normalizedError.message,
    stack: normalizedError.stack,
    ...context,
  });
}

export function initializeGlobalErrorHandling() {
  if (globalHandlersInitialized || typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    reportError(event.error ?? event.message, {
      source: "window.error",
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportError(event.reason, {
      source: "window.unhandledrejection",
    });
  });

  globalHandlersInitialized = true;
}
