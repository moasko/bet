import { UserRols, UserStatus } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  user: {
    id?: number;
    name?: string;
    email?: string;
    role?: UserRols;
    status?: UserStatus;
    permissions?: string[];
  } | null;
  isAuthenticated: boolean;
  setUser: (user: AuthState["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
