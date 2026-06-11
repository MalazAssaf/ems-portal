import {
  Department,
  DepartmentFilter,
  DepartmentRequest,
  PaginatedResponse,
} from "@/types";
import { api } from "./axios";

export const getDepartmentsWithPagination = async (
  filter: DepartmentFilter,
  page = 1,
  size = 10,
): Promise<PaginatedResponse<Department>> => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("size", String(size));

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });
  const response = await api.get(`api/department?${params.toString()}`);
  return response.data.data;
};

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get(`api/department?page=1&size=1000`);
  return response.data.data.content;
};

export const createDepartment = async (
  data: DepartmentRequest,
): Promise<Department> => {
  const response = await api.post(`api/department`, data);
  return response.data.data;
};

export const deleteDepartment = async (id: string): Promise<string> => {
  const response = await api.delete(`api/department/${id}`);
  return response.data.data;
};

export const updateDepartment = async (
  id: string,
  data: DepartmentRequest,
): Promise<Department> => {
  const response = await api.put(`api/department/${id}`, data);
  return response.data.data;
};

export const assignManager = async (
  departmentId: string,
  managerId: string,
): Promise<string> => {
  const response = await api.patch(`api/department/${departmentId}/manager`, {
    managerId,
  });
  return response.data.data;
};

export const removeManager = async (departmentId: string): Promise<string> => {
  const response = await api.delete(`api/department/${departmentId}/manager`);
  return response.data.data;
};
