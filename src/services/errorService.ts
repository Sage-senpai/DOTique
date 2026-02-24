/**
 * errorService.ts
 *
 * Centralised error reporting for DOTique.
 *
 * Sentry integration:
 *   1. Install: pnpm add @sentry/react @sentry/vite-plugin
 *   2. Set VITE_SENTRY_DSN in .env
 *   3. Uncomment the import and init block below.
 *   4. Call initializeGlobalErrorHandling() once in main.tsx.
 *
 * Without Sentry the service is fully functional — it logs to the console
 * in development only and is a no-op in production for non-critical issues.
 */

// ---------------------------------------------------------------------------
// Sentry integration (opt-in — uncomment when @sentry/react is installed)
// ---------------------------------------------------------------------------
// import * as Sentry from "@sentry/react";
//
// const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN as string | undefined;
//
// export function initializeSentry() {
//   if (!SENTRY_DSN) return;
//   Sentry.init({
//     dsn: SENTRY_DSN,
//     environment: import.meta.env.MODE,
//     release: import.meta.env.VITE_APP_VERSION ?? "0.0.0",
//     tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
//     integrations: [Sentry.browserTracingIntegration()],
//   });
// }
// ---------------------------------------------------------------------------

export type ErrorSeverity = "fatal" | "error" | "warning" | "info";

export type ErrorContext = Record<string, unknown>;

let globalHandlersInitialized = false;

// ---------------------------------------------------------------------------
// Internal: send to monitoring backend
// ---------------------------------------------------------------------------

function sendToMonitoring(
  error: Error,
  severity: ErrorSeverity,
  context: ErrorContext
): void {
  // Sentry stub — replace the body below with:
  //   Sentry.withScope((scope) => {
  //     scope.setExtras(context);
  //     scope.setLevel(severity);
  //     Sentry.captureException(error);
  //   });
  void error;
  void severity;
  void context;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Report an unexpected error (severity: error).
 *
 * @param error   - Any thrown value (Error, string, unknown)
 * @param context - Key/value metadata for debugging
 */
export function reportError(error: unknown, context: ErrorContext = {}): void {
  const normalizedError =
    error instanceof Error ? error : new Error(String(error));

  if (import.meta.env.DEV) {
    console.error("[DOTique:error]", normalizedError.message, { ...context, stack: normalizedError.stack });
  }

  sendToMonitoring(normalizedError, "error", context);
}

/**
 * Report a non-fatal warning (severity: warning).
 * Use for degraded states (stub mode, missing env vars, etc.).
 */
export function reportWarning(message: string, context: ErrorContext = {}): void {
  if (import.meta.env.DEV) {
    console.warn("[DOTique:warning]", message, context);
  }

  sendToMonitoring(new Error(message), "warning", context);
}

/**
 * Report an informational event (severity: info).
 * Use for analytics-like milestones (first mint, wallet connected, etc.).
 */
export function reportInfo(message: string, context: ErrorContext = {}): void {
  if (import.meta.env.DEV) {
    console.info("[DOTique:info]", message, context);
  }

  sendToMonitoring(new Error(message), "info", context);
}

/**
 * Wire up global window.error and unhandledrejection handlers.
 * Call once from main.tsx after React mounts.
 */
export function initializeGlobalErrorHandling(): void {
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
