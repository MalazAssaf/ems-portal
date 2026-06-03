import { useDepartments } from "@/hooks/useDepartments";
import { EmployeeRequest } from "@/types";
import { useState } from "react";
import { Dropdown } from "../ui/Dropdown";

type CreateEmployeeFormProps = {
  onClose: () => void;
  handleCreate: (data: EmployeeRequest) => void;
};

function CreateEmployeeForm({
  onClose,
  handleCreate,
}: CreateEmployeeFormProps) {
  const [form, setForm] = useState<EmployeeRequest>({
    name: "",
    email: "",
    phoneNumber: "",
    hireDate: "",
    departmentId: "",
    role: "EMPLOYEE",
  });

  const { data: departments } = useDepartments();

  const handleChange = (field: keyof EmployeeRequest, value: string | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label>Hire Date</label>
        <input
          type="date"
          name="hireDate"
          value={form.hireDate}
          onChange={(e) => handleChange("hireDate", e.target.value)}
          className="w-full border rounded-md p-2"
          required
          min={new Date().toISOString().split("T")[0]}
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
          Role
        </label>
        <Dropdown
          value={form.role}
          placeholder={form.role}
          options={["ADMIN", "MANAGER", "EMPLOYEE"].map((d) => ({
            label: d,
            value: d,
          }))}
          onChange={(value) => {
            handleChange("role", value);
          }}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-primary"
        >
          Create Employee
        </button>
      </div>
    </form>
  );
}

export default CreateEmployeeForm;
