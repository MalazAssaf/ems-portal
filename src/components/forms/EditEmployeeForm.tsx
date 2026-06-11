"use client";

import { useState } from "react";
import { Employee, EmployeeUpdateRequest } from "@/types";
import { useDepartments } from "@/hooks/useDepartments";
import { Dropdown } from "../ui/Dropdown";

type Props = {
  employee: Employee;
  handleEdit: (data: EmployeeUpdateRequest) => void;
  onClose: () => void;
};

export function EditEmployeeForm({ employee, handleEdit, onClose }: Props) {
  const [form, setForm] = useState<EmployeeUpdateRequest>({
    name: employee.name,
    phoneNumber: employee.phoneNumber,
    departmentId: employee.departmentInfo.id,
    role: employee.role,
  });

  const { data: departments } = useDepartments();

  const handleChange = (
    field: keyof EmployeeUpdateRequest,
    value: string | null,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
          onChange={(e) => handleChange("name", e.target.value)}
          className="px-3 py-2 rounded-md border text-sm"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-ink)",
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-medium"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Phone Number
        </label>
        <input
          value={form.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          className="px-3 py-2 rounded-md border text-sm"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-ink)",
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-medium"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Department
        </label>
        <Dropdown
          value={form.departmentId}
          placeholder="Select department"
          options={
            departments?.map((d) => ({ label: d.name, value: d.id })) ?? []
          }
          onChange={(deptId) => {
            handleChange("departmentId", deptId);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-medium"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Manager
        </label>
        <input
          disabled
          value={
            departments?.find((d) => d.id === form.departmentId)?.manager
              ?.name ?? "No manager"
          }
          className="px-3 py-2 rounded-md border text-sm opacity-50 cursor-not-allowed"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-ink)",
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-xs font-medium"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Role
        </label>
        <Dropdown
          value={form.role}
          placeholder={employee.role}
          options={["ADMIN", "MANAGER", "EMPLOYEE"].map((d) => ({
            label: d,
            value: d,
          }))}
          onChange={(value) => {
            handleChange("role", value);
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
