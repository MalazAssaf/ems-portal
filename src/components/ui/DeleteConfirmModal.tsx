"use client";

type DeleteConfirmModalProps = {
  name?: string;
  avatar?: string;
  subtitle?: string;
  deletionMessage?: string;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({
  name,
  avatar,
  subtitle,
  deletionMessage = "Are you sure you want to delete ",
  isPending,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <>
      {/* Entity info */}
      <div className="flex items-center gap-3 mb-4">
        {avatar && (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
            style={{
              backgroundColor: "var(--color-danger-light)",
              color: "var(--color-danger-text)",
            }}
          >
            {avatar.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-ink)" }}
          >
            {name}
          </p>
          {subtitle && (
            <p
              className="text-xs"
              style={{ color: "var(--color-ink-secondary)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Warning */}
      <p
        className="text-sm mb-4"
        style={{ color: "var(--color-ink-secondary)" }}
      >
        {deletionMessage}
        <strong style={{ color: "var(--color-ink)" }}>{name}</strong>? This
        action cannot be undone.
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md text-sm border cursor-pointer"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-ink-secondary)",
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isPending}
          className="px-4 py-2 rounded-md text-sm font-medium text-white disabled:opacity-60 cursor-pointer"
          style={{ backgroundColor: "var(--color-danger-text)" }}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </>
  );
}
