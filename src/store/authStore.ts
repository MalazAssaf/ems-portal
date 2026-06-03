import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
}

interface AuthStore {
  user: User | null;
  setAuth: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      logout: async () => {
        await fetch("http://localhost:8080/api/auth/logout", {
          method: "POST",
          credentials: "include", // sends the cookie with the request
        });
        set({ user: null });
      },
    }),
    {
      name: "ems-auth",
    },
  ),
);

export default useAuthStore;
