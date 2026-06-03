"use client";

import { useState } from "react";
import {
  useEmployees,
  useDeleteEmployee,
  useUpdateEmployee,
  useCreateEmployee,
} from "@/hooks/useEmployees";

import { DataTable, Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { EditEmployeeForm } from "@/components/forms/EditEmployeeForm";
import { Employee, EmployeeRequest, EmployeeUpdateRequest } from "@/types";
import { Snackbar } from "@/components/ui/Snackbar";
import CreateEmployeeForm from "@/components/forms/CreateEmployeeForm";

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
    null,
  );

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({ open: false, message: "", type: "success" });

  const showSnackbar = (message: string, type: "success" | "error") => {
    setSnackbar({ open: true, message, type });
  };

  const {
    data: employeesData,
    isLoading,
    error,
  } = useEmployees(page, pageSize);

  const createMutation = useCreateEmployee();
  const editMutation = useUpdateEmployee();
  const deleteMutation = useDeleteEmployee();

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleEdit = (formData: EmployeeUpdateRequest) => {
    if (!editingEmployee) return;
    editMutation.mutate(
      { id: editingEmployee.id, data: formData },
      {
        onSuccess: () => {
          setEditingEmployee(null);
          showSnackbar("Employee updated successfully", "success");
        },
        onError: (error) => {
          showSnackbar(
            error?.response?.data?.errors?.[0]?.message ??
              "Failed to update employee.",
            "error",
          );
        },
      },
    );
  };

  const handleCreate = (data: EmployeeRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        showSnackbar("Employee created successfully", "success");
      },
      onError: (error) => {
        showSnackbar(
          error?.response?.data?.errors?.[0]?.message ??
            "Failed to create employee.",
          "error",
        );
      },
    });
  };

  const handleDelete = () => {
    if (!deletingEmployee) return;
    deleteMutation.mutate(deletingEmployee.id, {
      onSuccess: () => {
        setDeletingEmployee(null);
        showSnackbar("Employee deleted successfully", "success");
      },
      onError: (error) => {
        showSnackbar(
          error?.response?.data?.errors?.[0]?.message ??
            "Failed to delete employee.",
          "error",
        );
      },
    });
  };

  const columns: Column<Employee>[] = [
    {
      key: "name",
      label: "Name",
      render: (e) => (
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
            style={{
              backgroundColor: "var(--color-primary-light)",
              color: "var(--color-primary)",
            }}
          >
            {e.name.slice(0, 2).toUpperCase()}
          </div>
          <span
            className="font-medium capitalize"
            style={{ color: "var(--color-ink)" }}
          >
            {e.name}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (e) => (
        <span
          style={{ color: "var(--color-ink-secondary)" }}
          className="lowercase"
        >
          {e.email}
        </span>
      ),
    },
    {
      key: "department",
      label: "Department",
      render: (e) => (
        <span style={{ color: "var(--color-ink)" }} className="capitalize">
          {e.departmentInfo?.name}
        </span>
      ),
    },
    {
      key: "manager",
      label: "Manager",
      render: (e) => (
        <span
          style={{ color: "var(--color-ink-secondary)" }}
          className="capitalize"
        >
          {e.departmentInfo.manager?.name ?? "—"}
        </span>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (e) => (
        <span
          className="px-2 py-0.5 rounded-full text-xs font-medium uppercase"
          style={{
            backgroundColor:
              e.role === "MANAGER"
                ? "var(--color-warning-light)"
                : e.role === "ADMIN"
                  ? "var(--color-danger-light)"
                  : "var(--color-primary-light)",
            color:
              e.role === "MANAGER"
                ? "var(--color-warning-text)"
                : e.role === "ADMIN"
                  ? "var(--color-danger-text)"
                  : "var(--color-primary)",
          }}
        >
          {e.role}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (e) => (
        <span
          className="px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: e.isActivated
              ? "var(--color-success-light)"
              : "var(--color-surface)",
            color: e.isActivated
              ? "var(--color-success-text)"
              : "var(--color-ink-secondary)",
            border: e.isActivated ? "none" : "1px solid var(--color-border)",
          }}
        >
          {e.isActivated ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (e) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditingEmployee(e)}
            className="px-3 py-1.5 rounded-md text-xs font-medium border"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-ink-secondary)",
              backgroundColor: "white",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => setDeletingEmployee(e)}
            disabled={deleteMutation.isPending}
            className="px-3 py-1.5 rounded-md text-xs font-medium border"
            style={{
              borderColor: "var(--color-danger-border)",
              color: "var(--color-danger-text)",
              backgroundColor: "var(--color-danger-light)",
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-lg font-medium"
            style={{ color: "var(--color-ink)" }}
          >
            Employees
          </h1>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Manage all employees in the system
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          + New employee
        </button>
      </div>

      <DataTable
        columns={columns}
        data={employeesData?.content ?? []}
        isLoading={isLoading}
        error={error}
        currentPage={employeesData?.currentPage ?? 1}
        totalPages={employeesData?.totalPages ?? 1}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Create Employee Modal */}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Employee"
      >
        {isCreateModalOpen && (
          <CreateEmployeeForm
            onClose={() => setIsCreateModalOpen(false)}
            handleCreate={handleCreate}
          />
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editingEmployee}
        onClose={() => setEditingEmployee(null)}
        title="Edit Employee"
      >
        {editingEmployee && (
          <EditEmployeeForm
            employee={editingEmployee}
            handleEdit={handleEdit}
            onClose={() => setEditingEmployee(null)}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={!!deletingEmployee}
        onClose={() => {
          setDeletingEmployee(null);
          deleteMutation.reset();
        }}
        title="Delete Employee"
      >
        {/* Employee info */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
            style={{
              backgroundColor: "var(--color-danger-light)",
              color: "var(--color-danger-text)",
            }}
          >
            {deletingEmployee?.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-ink)" }}
            >
              {deletingEmployee?.name}
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--color-ink-secondary)" }}
            >
              {deletingEmployee?.email}
            </p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setDeletingEmployee(null);
              deleteMutation.reset();
            }}
            className="px-4 py-2 rounded-md text-sm border"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-ink-secondary)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 rounded-md text-sm font-medium text-white disabled:opacity-60"
            style={{ backgroundColor: "var(--color-danger-text)" }}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
