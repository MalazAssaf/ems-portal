"use client";

import { useEffect } from "react";

type SnackbarProps = {
  message: string;
  type: "success" | "error";
  open: boolean;
  onClose: () => void;
  duration?: number;
};

export function Snackbar({
  message,
  type,
  open,
  onClose,
  duration = 3000,
}: SnackbarProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm"
      style={{
        backgroundColor:
          type === "success"
            ? "var(--color-success-light)"
            : "var(--color-danger-light)",
        color:
          type === "success"
            ? "var(--color-success-text)"
            : "var(--color-danger-text)",
        border: `1px solid ${type === "success" ? "var(--color-success-text)" : "var(--color-danger-text)"}`,
        opacity: 0.95,
      }}
    >
      <span>{type === "success" ? "✅" : "❌"}</span>
      <p>{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-xs opacity-60 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}
