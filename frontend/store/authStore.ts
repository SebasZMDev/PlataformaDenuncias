// /src/store/authStore.ts
import { create } from "zustand";
import { api } from "@/lib/api";
import { Usuario } from "@/types/user";

interface AuthState {
  user: Usuario | null;
  loading: boolean;
  error: string | null;

  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { nombre: string; apellido: string; email: string; telefono?: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (data) => {
    try {
      set({ loading: true, error: null });
      // backend seteará cookie HttpOnly
      await api("/auth/login", { method: "POST", body: JSON.stringify(data) });

      // ahora traer el usuario actual
      const me: Usuario = await api("/usuarios/me");
      set({ user: me });
    } catch (err: any) {
      set({ error: err.message || "Error login", user: null });
    } finally {
      set({ loading: false });
    }
  },

  register: async (data) => {
    try {
      set({ loading: true, error: null });
      await api("/auth/register", { method: "POST", body: JSON.stringify(data) });
      const me: Usuario = await api("/usuarios/me");
      set({ user: me });
    } catch (err: any) {
      set({ error: err.message || "Error register", user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    set({ user: null });
  },

  fetchUser: async () => {
    try {
      set({ loading: true });
      const me: Usuario = await api("/usuarios/me");
      set({ user: me });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
