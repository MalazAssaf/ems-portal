import { Department, PaginatedResponse } from "@/types";
import { api } from "./axios";

export const getDepartmentsWithPagination = async (
  page = 1,
  size = 10,
): Promise<PaginatedResponse<Department>> => {
  const response = await api.get(`api/department?page=${page}&size=${size}`);
  return response.data.data;
};

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get(`api/department?page=1&size=1000`);
  return response.data.data.content;
};
