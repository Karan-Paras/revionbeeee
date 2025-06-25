import { create } from "zustand";
import { persist } from "zustand/middleware";

interface state {
  sessionId: string;
}

interface action {
  setSessionId: (sessionId: string) => void;
  clearSessionId: () => void;
}

export const useSessionStore = create<
  state & action,
  [["zustand/persist", state & action]]
>(
  persist(
    (set) => ({
      sessionId: "",
      setSessionId: (sessionId) => set({ sessionId }),
      clearSessionId: () => set({ sessionId: "" }),
    }),
    {
      name: "session-storage",
    }
  )
);
