"use client";

import { useState } from "react";

type Option<T> = {
  label: string;
  value: T;
};

type DropdownProps<T> = {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
};

export function Dropdown<T>({
  value,
  options,
  onChange,
  placeholder = "Select",
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const selected = (options ?? []).find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 px-3 py-2 rounded-md border text-sm cursor-pointer"
        style={{
          borderColor: "var(--color-border)",
          color: selected ? "var(--color-ink)" : "var(--color-ink-secondary)",
          backgroundColor: "white",
          minWidth: "64px",
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="w-full absolute top-full mb-1 flex flex-col rounded-lg border shadow-md overflow-y-auto z-10"
          style={{
            backgroundColor: "white",
            borderColor: "var(--color-border)",
            maxHeight: "180px",
          }}
        >
          {options.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm text-left transition-colors"
              style={{
                backgroundColor:
                  opt.value === value ? "var(--color-primary-light)" : "white",
                color:
                  opt.value === value
                    ? "var(--color-primary)"
                    : "var(--color-ink)",
                fontWeight: opt.value === value ? 500 : 400,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
