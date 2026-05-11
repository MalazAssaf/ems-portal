import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("api/auth/login");
    if (error.response?.status === 401 && !isLoginRequest) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
