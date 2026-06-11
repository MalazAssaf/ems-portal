"use client";

import { DepartmentRequest } from "@/types";
import { useState } from "react";

type CreateDepartmentFormProps = {
  onClose: () => void;
  handleCreate: (data: DepartmentRequest) => void;
};

function CreateDepartmentForm({
  onClose,
  handleCreate,
}: CreateDepartmentFormProps) {
  const [form, setForm] = useState<DepartmentRequest>({
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="capitalize">
        <label>Name of department</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-md cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-primary cursor-pointer"
        >
          Create Department
        </button>
      </div>
    </form>
  );
}
export default CreateDepartmentForm;
