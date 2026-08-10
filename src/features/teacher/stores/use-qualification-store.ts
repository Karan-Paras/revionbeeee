import { create } from "zustand";

export type TeacherQualification = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
  documentName?: string;
  documentUrl?: string;
  documentType?: string;
};

type QualificationStore = {
  qualifications: TeacherQualification[];
  addQualification: (qualification: TeacherQualification) => void;
  removeQualification: (id: string) => void;
};

export const useQualificationStore = create<QualificationStore>((set) => ({
  qualifications: [],
  addQualification: (qualification) =>
    set((state) => ({
      qualifications: [...state.qualifications, qualification],
    })),
  removeQualification: (id) =>
    set((state) => ({
      qualifications: state.qualifications.filter((item) => item.id !== id),
    })),
}));
