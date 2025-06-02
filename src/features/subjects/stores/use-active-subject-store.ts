import { create } from "zustand";

interface state {
  activeSubject: {
    topic: string;
    subject: string;
  };
}

interface action {
  setActiveSubject: (topic: string, subject: string) => void;
}

const useActiveSubjectStore = create<state & action>((set) => ({
  activeSubject: {
    topic: "",
    subject: "",
  },
  setActiveSubject: (topic, subject) =>
    set((state) => ({
      activeSubject: {
        ...state.activeSubject,
        topic,
        subject,
      },
    })),
}));

export { useActiveSubjectStore };
