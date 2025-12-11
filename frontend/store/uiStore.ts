import { create } from "zustand";

interface UIState {
  loadingGlobal: boolean;
  modal: string | null;

  setLoading: (value: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  loadingGlobal: false,
  modal: null,

  setLoading: (value) => set({ loadingGlobal: value }),

  openModal: (id) => set({ modal: id }),
  closeModal: () => set({ modal: null }),
}));
