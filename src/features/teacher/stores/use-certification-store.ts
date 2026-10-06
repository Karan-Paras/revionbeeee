import { create } from "zustand";

export type TeacherCertification = {
  id: string;
  certificationName: string;
  issuingAuthority: string;
  issueDate: string;
  certificateName?: string;
  certificateType?: string;
  certificateUrl?: string;
};

type CertificationStore = {
  certifications: TeacherCertification[];
  setCertifications: (certifications: TeacherCertification[]) => void;
  addCertification: (certification: TeacherCertification) => void;
  removeCertification: (id: string) => void;
};

export const useCertificationStore = create<CertificationStore>((set) => ({
  certifications: [],
  setCertifications: (certifications) => set({ certifications }),
  addCertification: (certification) =>
    set((state) => ({
      certifications: [...state.certifications, certification],
    })),
  removeCertification: (id) =>
    set((state) => ({
      certifications: state.certifications.filter((item) => item.id !== id),
    })),
}));
