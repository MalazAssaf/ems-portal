import { LoginFormData } from "@/lib/validations/auth";
import { api } from "./axios";

export const loginApi = async (data: LoginFormData) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};
