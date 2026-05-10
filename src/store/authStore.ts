import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  sub: string;
  role: "ADMIN" | "USER";
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "ems-auth",
    },
  ),
);

export default useAuthStore;
