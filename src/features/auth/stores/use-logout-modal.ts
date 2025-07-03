import { create } from "zustand";

interface state {
  isOpen: boolean;
}

interface action {
  onOpen: () => void;
  onClose: () => void;
}

export const useLogoutModal = create<state & action>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
