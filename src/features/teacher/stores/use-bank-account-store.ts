import { create } from "zustand";

export type TeacherBankAccount = {
  id: string;
  accountNumber: string;
  accountHolderName: string;
  routingNumber: string;
  bankName: string;
};

type BankAccountStore = {
  accounts: TeacherBankAccount[];
  addAccount: (account: TeacherBankAccount) => void;
  removeAccount: (id: string) => void;
};

export const useBankAccountStore = create<BankAccountStore>((set) => ({
  accounts: [],
  addAccount: (account) =>
    set((state) => ({ accounts: [...state.accounts, account] })),
  removeAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.id !== id),
    })),
}));
