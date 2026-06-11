"use client";
import CreateDepartmentForm from "@/components/forms/CreateDepartmentForm";
import { EditDepartmentForm } from "@/components/forms/EditDepartmentForm";
import { Column, DataTable } from "@/components/ui/DataTable";
import { DeleteConfirmModal } from "@/components/ui/DeleteConfirmModal";
import { Dropdown } from "@/components/ui/Dropdown";
import { FilterBar } from "@/components/ui/FilterBar";
import { Modal } from "@/components/ui/Modal";
import { Snackbar } from "@/components/ui/Snackbar";
import {
  useAssignManager,
  useCreateDepartment,
  useDeleteDepartment,
  useDepartmentsWithPagination,
  useRemoveManager,
  useUpdateDepartment,
} from "@/hooks/useDepartments";
import { useEmployees } from "@/hooks/useEmployees";
import {
  Department,
  DepartmentFilter,
  DepartmentRequest,
  UserRole,
} from "@/types";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [selectedManagerId, setSelectedManagerId] = useState<string>("");

  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null,
  );
  const [deletingDepartment, setDeletingDepartment] =
    useState<Department | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignManagerModalOpen, setIsAssignManagerModalOpen] =
    useState(false);
  const [isRemoveManagerModalOpen, setIsRemoveManagerModalOpen] =
    useState(false);

  const createMutation = useCreateDepartment();
  const editMutation = useUpdateDepartment();
  const deleteMutation = useDeleteDepartment();
  const assignManagerMutation = useAssignManager();
  const removeManagerMutation = useRemoveManager();

  const emptyFilters: DepartmentFilter = {
    name: "",
    hasManager: "",
    minEmployees: "",
    maxEmployees: "",
  };

  const [filters, setFilters] = useState<DepartmentFilter>(emptyFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<DepartmentFilter>(emptyFilters);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({ open: false, message: "", type: "success" });

  const {
    data: departmentsData,
    isLoading,
    error,
  } = useDepartmentsWithPagination(appliedFilters, page, pageSize);

  const { data: managerData } = useEmployees(
    1,
    1000,
    { role: UserRole.MANAGER, departmentId: selectedDepartment?.id ?? "" },
    { enabled: !!selectedDepartment },
  );

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleCreate = (data: DepartmentRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        showSnackbar("Department created successfully", "success");
      },
      onError: (error) => {
        showSnackbar(
          error?.response?.data?.errors?.[0]?.message ??
            "Failed to create Department.",
          "error",
        );
      },
    });
  };

  const handleEdit = (formData: DepartmentRequest) => {
    if (!editingDepartment) return;
    editMutation.mutate(
      { id: editingDepartment.id, data: formData },
      {
        onSuccess: () => {
          setEditingDepartment(null);
          showSnackbar("Department updated successfully", "success");
        },
        onError: (error) => {
          showSnackbar(
            error?.response?.data?.errors?.[0]?.message ??
              "Failed to update department.",
            "error",
          );
        },
      },
    );
  };

  const handleDelete = () => {
    if (!deletingDepartment) return;
    deleteMutation.mutate(deletingDepartment.id, {
      onSuccess: (data) => {
        setDeletingDepartment(null);
        showSnackbar(data, "success");
      },
      onError: (error) => {
        showSnackbar(
          error?.response?.data?.errors?.[0]?.message ??
            "Failed to Delete Department.",
          "error",
        );
      },
    });
  };

  const handleAssign = () => {
    if (!selectedDepartment || !selectedManagerId) return;
    assignManagerMutation.mutate(
      {
        departmentId: selectedDepartment.id,
        managerId: selectedManagerId,
      },
      {
        onSuccess: (data) => {
          closeAssignModal();
          showSnackbar(data, "success");
        },
        onError: (error) => {
          showSnackbar(
            error?.response?.data?.errors?.[0]?.message ??
              "Failed to assign manager.",
            "error",
          );
        },
      },
    );
  };

  const closeAssignModal = () => {
    setIsAssignManagerModalOpen(false);
    setSelectedDepartment(null);
    setSelectedManagerId("");
  };

  const handleRemoveManager = () => {
    if (!selectedDepartment) return;
    removeManagerMutation.mutate(selectedDepartment.id, {
      onSuccess: (data) => {
        setIsRemoveManagerModalOpen(false);
        setSelectedDepartment(null);
        showSnackbar(data, "success");
      },
      onError: (error) => {
        showSnackbar(
          error?.response?.data?.errors?.[0]?.message ??
            "Failed to remove manager.",
          "error",
        );
      },
    });
  };

  const showSnackbar = (message: string, type: "success" | "error") => {
    setSnackbar({ open: true, message, type });
  };

  const columns: Column<Department>[] = [
    {
      key: "department",
      label: "name",
      render: (e) => (
        <span
          style={{
            color: "var(--color-ink-secondary)",
          }}
          className="capitalize"
        >
          {e.name}
        </span>
      ),
    },
    {
      key: "manager",
      label: "manager",
      render: (e) => (
        <span
          className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
          style={{
            color: e.manager
              ? "var(--color-success-text)"
              : "var(--color-ink-secondary)",
            backgroundColor: e.manager
              ? "var(--color-success-light)"
              : "var(--color-surface)",
            border: e.manager ? "none" : "1px solid var(--color-border)",
          }}
        >
          {e.manager?.name ?? "No Manager"}
        </span>
      ),
    },
    {
      key: "employees_count",
      label: "employees number",
      render: (e) => <span className="capitalize">{e.employeeCount ?? 0}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (e) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditingDepartment(e)}
            className="px-3 py-1.5 rounded-md text-xs font-medium border cursor-pointer"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-ink-secondary)",
              backgroundColor: "white",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => setDeletingDepartment(e)}
            disabled={deleteMutation.isPending}
            className="px-3 py-1.5 rounded-md text-xs font-medium border cursor-pointer"
            style={{
              borderColor: "var(--color-danger-border)",
              color: "var(--color-danger-text)",
              backgroundColor: "var(--color-danger-light)",
            }}
          >
            Delete
          </button>
          <Dropdown
            value={null}
            placeholder="more"
            options={
              e.manager
                ? [
                    { label: "Change Manager", value: "change" },
                    { label: "Remove Manager", value: "remove" },
                  ]
                : [{ label: "Assign Manager", value: "assign" }]
            }
            onChange={(action) => {
              if (action === "assign" || action === "change") {
                setSelectedDepartment(e);
                setIsAssignManagerModalOpen(true);
              }
              if (action === "remove") {
                setSelectedDepartment(e);
                setIsRemoveManagerModalOpen(true);
              }
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-lg font-medium"
            style={{ color: "var(--color-ink)" }}
          >
            Departments
          </h1>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Manage all Departments in the system
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white cursor-pointer"
          style={{ backgroundColor: "var(--color-primary)" }}
          onClick={() => setIsCreateModalOpen(true)}
        >
          + New Department
        </button>
      </div>
      <FilterBar
        filters={filters}
        fields={[
          { type: "text", name: "name", label: "Name" },

          {
            type: "number",
            name: "minEmployees",
            label: "Min Employees",
            min: 0,
          },
          {
            type: "number",
            name: "maxEmployees",
            label: "Max Employees",
            min: 0,
          },
          {
            type: "select",
            name: "hasManager",
            label: "Has Manager",
            options: [
              { label: "All", value: "" },
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ],
          },
        ]}
        onChange={(name, value) =>
          setFilters((prev) => ({ ...prev, [name]: value }))
        }
        onSearch={() => {
          setAppliedFilters(filters);
          setPage(1);
        }}
        onReset={() => {
          setFilters(emptyFilters);
          setAppliedFilters(emptyFilters);
          setPage(1);
        }}
      />
      <div>
        <DataTable
          columns={columns}
          data={departmentsData?.content ?? []}
          isLoading={isLoading}
          error={error}
          currentPage={departmentsData?.currentPage ?? 1}
          totalPages={departmentsData?.totalPages ?? 1}
          onPageChange={setPage}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        ></DataTable>
      </div>

      {/* Create Modal */}
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create new Department"
      >
        {isCreateModalOpen && (
          <CreateDepartmentForm
            handleCreate={handleCreate}
            onClose={() => setIsCreateModalOpen(false)}
          />
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editingDepartment}
        onClose={() => setEditingDepartment(null)}
        title="Edit Department"
      >
        {editingDepartment && (
          <EditDepartmentForm
            department={editingDepartment}
            handleEdit={handleEdit}
            onClose={() => setEditingDepartment(null)}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={!!deletingDepartment}
        onClose={() => setDeletingDepartment(null)}
        title="Delete Department"
      >
        <DeleteConfirmModal
          name={deletingDepartment?.name}
          isPending={deleteMutation.isPending}
          onClose={() => setDeletingDepartment(null)}
          onConfirm={handleDelete}
        />
      </Modal>

      {/* Assign Manager Modal */}
      <Modal
        open={isAssignManagerModalOpen}
        onClose={() => {
          setIsAssignManagerModalOpen(false);
          setSelectedDepartment(null);
        }}
        title={`${selectedDepartment?.manager ? "Change" : "Assign"} Manager — ${selectedDepartment?.name} Department`}
      >
        <div className="flex flex-col gap-4">
          {managerData?.content.filter(
            (manager) => manager.id !== selectedDepartment?.manager?.id,
          ).length === 0 ? (
            <p
              style={{ color: "var(--color-ink-secondary)", fontSize: "13px" }}
            >
              No other managers available in this department.
            </p>
          ) : (
            <Dropdown
              value={selectedManagerId}
              placeholder="Select a manager"
              options={
                managerData?.content
                  .filter(
                    (manager) => manager.id !== selectedDepartment?.manager?.id,
                  )
                  .map((manager) => ({
                    label: manager.name,
                    value: manager.id,
                  })) ?? []
              }
              onChange={(value) => setSelectedManagerId(value as string)}
            />
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={closeAssignModal}
              style={{
                height: "38px",
                padding: "0 16px",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                background: "transparent",
                color: "var(--color-ink-secondary)",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedManagerId || assignManagerMutation.isPending}
              style={{
                height: "38px",
                padding: "0 20px",
                borderRadius: "8px",
                border: "none",
                background: "var(--color-primary)",
                color: "white",
                fontSize: "13px",
                fontWeight: 500,
                cursor: !selectedManagerId ? "not-allowed" : "pointer",
                opacity: !selectedManagerId ? 0.5 : 1,
              }}
            >
              {assignManagerMutation.isPending ? "Assigning..." : "Assign"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Remove Manager Modal */}
      <Modal
        open={isRemoveManagerModalOpen}
        onClose={() => setIsRemoveManagerModalOpen(false)}
        title="Remove Manager"
      >
        <DeleteConfirmModal
          name={selectedDepartment?.name}
          isPending={removeManagerMutation.isPending}
          deletionMessage={`Are you sure you want to remove ${selectedDepartment?.manager?.name} from managing `}
          onClose={() => setIsRemoveManagerModalOpen(false)}
          onConfirm={handleRemoveManager}
        />
      </Modal>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}
