import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "@/api/employee";
import {
  EmployeeFilter,
  EmployeeRequest,
  EmployeeUpdateRequest,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEmployees = (
  page: number,
  size: number,
  filters: EmployeeFilter,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["employees", page, size, filters],
    queryFn: () => getEmployees(filters, page, size),
    enabled: options?.enabled ?? true,
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployee(id),
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeRequest) => createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EmployeeUpdateRequest }) =>
      updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
