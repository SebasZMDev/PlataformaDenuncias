import { create } from "zustand";
import { Denuncia, CrearDenunciaRequest } from "@/types/denuncia";
import { api } from "@/lib/api";

interface DenunciaState {
  denuncias: Denuncia[];
  denunciaActual: Denuncia | null;
  loading: boolean;
  error: string | null;

  fetchDenuncias: () => Promise<void>;
  fetchDenuncia: (id: number) => Promise<void>;
  crearDenuncia: (data: CrearDenunciaRequest) => Promise<void>;
}

export const useDenunciaStore = create<DenunciaState>((set) => ({
  denuncias: [],
  denunciaActual: null,
  loading: false,
  error: null,

  fetchDenuncias: async () => {
    try {
      set({ loading: true, error: null });
      const res: Denuncia[] = await api("/denuncias");
      set({ denuncias: res });
    } catch (err: any) {
      set({ error: err.message || "Error al obtener denuncias" });
    } finally {
      set({ loading: false });
    }
  },

  fetchDenuncia: async (id: number) => {
    try {
      set({ loading: true, error: null });

      const res: Denuncia = await api(`/denuncias/${id}`);
      set({ denunciaActual: res });
    } catch (err: any) {
      set({ error: err.message || "Error al obtener denuncia" });
    } finally {
      set({ loading: false });
    }
  },

  crearDenuncia: async (data) => {
    try {
      set({ loading: true, error: null });

      await api("/denuncias", {
        method: "POST",
        body: JSON.stringify(data),
      });

      // refrescar lista luego de crear
      const res: Denuncia[] = await api("/denuncias");
      set({ denuncias: res });
    } catch (err: any) {
      set({ error: err.message || "Error al enviar denuncia" });
    } finally {
      set({ loading: false });
    }
  },
}));
