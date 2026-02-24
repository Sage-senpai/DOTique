// src/services/errorService.ts
// Sentry-ready error reporting.
// To enable Sentry: `pnpm add @sentry/react` then uncomment the Sentry lines.

type ErrorContext = Record<string, unknown>;
type ErrorSeverity = "fatal" | "error" | "warning" | "info";

interface ReportOptions {
  context?: ErrorContext;
  severity?: ErrorSeverity;
  tags?: Record<string, string>;
}

let globalHandlersInitialized = false;

function sendToMonitoring(error: Error, severity: ErrorSeverity, options: ReportOptions): void {
  // TODO: import * as Sentry from "@sentry/react";
  //       Sentry.captureException(error, { level: severity, extra: options.context, tags: options.tags });
  if (import.meta.env.DEV) {
    const method = severity === "warning" || severity === "info" ? "warn" : "error";
    console[method](`[DOTique ${severity.toUpperCase()}]`, error.message, options.context ?? {});
  }
}

export function reportError(error: unknown, options: ReportOptions = {}): void {
  const normalizedError = error instanceof Error ? error : new Error(String(error));
  sendToMonitoring(normalizedError, options.severity ?? "error", options);
}

export function reportWarning(message: string, context: ErrorContext = {}): void {
  reportError(new Error(message), { severity: "warning", context });
}

export function initializeGlobalErrorHandling(): void {
  if (globalHandlersInitialized || typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    reportError(event.error ?? new Error(event.message), {
      severity: "fatal",
      context: {
        source: "window.error",
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportError(event.reason, {
      severity: "error",
      context: { source: "window.unhandledrejection" },
    });
  });

  globalHandlersInitialized = true;
}
