import { create } from "zustand";

interface state {
  hasFilledEmail: boolean;
  hasChangedPassword: boolean;
}

interface action {
  setHasFilledEmail: (value: boolean) => void;
  setHasChangedPassword: (value: boolean) => void;
}

const useForgotPasswordStore = create<state & action>((set) => ({
  hasFilledEmail: false,
  hasChangedPassword: false,
  setHasFilledEmail: (value) => set({ hasFilledEmail: value }),
  setHasChangedPassword: (value) => set({ hasChangedPassword: value }),
}));

export { useForgotPasswordStore };
