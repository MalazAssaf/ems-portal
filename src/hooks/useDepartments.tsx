import {
  assignManager,
  createDepartment,
  deleteDepartment,
  getDepartments,
  getDepartmentsWithPagination,
  removeManager,
  updateDepartment,
} from "@/api/department";
import { DepartmentFilter, DepartmentRequest } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDepartmentsWithPagination(
  filters: DepartmentFilter,
  page: number,
  size: number,
) {
  return useQuery({
    queryKey: ["departments", page, size, filters],
    queryFn: () => getDepartmentsWithPagination(filters, page, size),
  });
}

export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments", "all"],
    queryFn: () => getDepartments(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentRequest) => createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DepartmentRequest }) =>
      updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useAssignManager = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      departmentId,
      managerId,
    }: {
      departmentId: string;
      managerId: string;
    }) => assignManager(departmentId, managerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useRemoveManager = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (departmentId: string) => removeManager(departmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
