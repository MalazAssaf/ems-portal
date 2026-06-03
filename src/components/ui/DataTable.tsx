"use client";

import React from "react";
import { Dropdown } from "./Dropdown";

export type Column<T> = {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  error?: unknown;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

export function DataTable<T>({
  columns,
  data,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: DataTableProps<T>) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      {/* ── Desktop table ── */}
      <div
        className="hidden md:block rounded-xl border overflow-x-auto"
        style={{ borderColor: "var(--color-border)" }}
      >
        <table
          className="w-full text-sm border-collapse"
          style={{ minWidth: "700px" }}
        >
          <thead>
            <tr style={{ backgroundColor: "var(--color-surface)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 text-xs font-medium"
                  style={{
                    color: "var(--color-ink-secondary)",
                    borderBottom: "0.5px solid var(--color-border)",
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: "white",
                  borderBottom:
                    index === data.length - 1
                      ? "none"
                      : "0.5px solid var(--color-border)",
                }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {data.map((row, index) => (
          <div
            key={index}
            className="rounded-xl border p-4 flex flex-col gap-3"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "white",
            }}
          >
            {columns.map((col) => (
              <div key={col.key} className="flex items-center justify-between">
                <span
                  className="text-xs font-medium w-24 shrink-0"
                  style={{ color: "var(--color-ink-secondary)" }}
                >
                  {col.label}
                </span>
                <span className="text-sm" style={{ color: "var(--color-ink)" }}>
                  {col.render(row)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Page size selector */}
      <div className="mt-2 w-fit">
        <Dropdown
          value={pageSize}
          options={[5, 10, 20, 50].map((n) => ({ label: String(n), value: n }))}
          onChange={onPageSizeChange}
        />
      </div>

      {/* Set page number*/}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm" style={{ color: "var(--color-ink-secondary)" }}>
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1.5 rounded-md text-sm border disabled:opacity-40"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-ink)",
            }}
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1.5 rounded-md text-sm border disabled:opacity-40"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-ink)",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
