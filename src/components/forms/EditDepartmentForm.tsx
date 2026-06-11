"use client";

import { useState } from "react";
import { Department, DepartmentRequest } from "@/types";

type Props = {
  department: Department;
  handleEdit: (data: DepartmentRequest) => void;
  onClose: () => void;
};

export function EditDepartmentForm({ department, handleEdit, onClose }: Props) {
  const [form, setForm] = useState<DepartmentRequest>({
    name: department.name,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-medium"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Name
        </label>
        <input
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          className="px-3 py-2 rounded-md border text-sm"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-ink)",
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 mt-2">
        <button
          type="button"
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
          type="submit"
          className="px-4 py-2 rounded-md text-sm font-medium text-white cursor-pointer"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Save changes
        </button>
      </div>
    </form>
  );
}
