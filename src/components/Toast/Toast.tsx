// src/components/Toast/Toast.tsx
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import "./Toast.scss";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const duration = toast.duration ?? 4000;
    timerRef.current = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div className={`dt-toast dt-toast--${toast.type}`} role="alert" aria-live="polite">
      <span className="dt-toast__icon">{ICONS[toast.type]}</span>
      <div className="dt-toast__body">
        {toast.title && <strong className="dt-toast__title">{toast.title}</strong>}
        <span className="dt-toast__message">{toast.message}</span>
      </div>
      <button
        className="dt-toast__close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((type: ToastType, message: string, title?: string, duration?: number) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => {
      // Cap at 5 toasts max
      const next = [...prev, { id, type, title, message, duration }];
      return next.length > 5 ? next.slice(next.length - 5) : next;
    });
  }, []);

  const toast = {
    success: useCallback((message: string, title?: string) => add("success", message, title), [add]),
    error: useCallback((message: string, title?: string) => add("error", message, title), [add]),
    warning: useCallback((message: string, title?: string) => add("warning", message, title), [add]),
    info: useCallback((message: string, title?: string) => add("info", message, title), [add]),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="dt-toast-container" aria-label="Notifications">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
