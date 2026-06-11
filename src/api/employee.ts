import {
  Employee,
  EmployeeFilter,
  EmployeeRequest,
  EmployeeUpdateRequest,
  PaginatedResponse,
} from "@/types";
import { api } from "./axios";

export const getEmployees = async (
  filter: EmployeeFilter,
  page = 1,
  size = 10,
): Promise<PaginatedResponse<Employee>> => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("size", String(size));

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  const response = await api.get(`api/employee?${params.toString()}`);
  return response.data.data;
};

export const getEmployee = async (id: string): Promise<Employee> => {
  const response = await api.get(`api/employee/${id}`);
  return response.data.data;
};

export const createEmployee = async (
  data: EmployeeRequest,
): Promise<Employee> => {
  const response = await api.post(`api/employee`, data);
  return response.data.data;
};

export const deleteEmployee = async (id: string): Promise<string> => {
  const response = await api.delete(`api/employee/${id}`);
  return response.data.data;
};

export const updateEmployee = async (
  id: string,
  data: EmployeeUpdateRequest,
): Promise<Employee> => {
  const response = await api.put(`api/employee/${id}`, data);
  return response.data.data;
};
