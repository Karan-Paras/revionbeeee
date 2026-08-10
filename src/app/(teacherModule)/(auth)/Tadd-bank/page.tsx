"use client";

import { useBankAccountStore } from "@/features/teacher/stores/use-bank-account-store";
import { paths } from "@/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputClassName =
  "mt-2 h-12 w-full rounded-lg border border-[#d7dce4] bg-white px-4 text-sm outline-none transition placeholder:text-[#999] focus:border-[#53a2eb] focus:ring-4 focus:ring-[#53a2eb]/10";

export default function TeacherAddBank() {
  const router = useRouter();
  const addAccount = useBankAccountStore((state) => state.addAccount);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    addAccount({
      id: crypto.randomUUID(),
      accountNumber: String(formData.get("accountNumber")),
      accountHolderName: String(formData.get("accountHolderName")),
      routingNumber: String(formData.get("routingNumber")),
      bankName: String(formData.get("bankName")),
    });

    router.push(paths.teacherBankDetails());
  }

  return (
    <main className="mths_bg relative grid h-dvh place-items-center overflow-hidden bg-cover bg-center bg-no-repeat p-5 before:absolute before:inset-0 before:bg-white/35">
      <section className="relative z-10 w-full max-w-[540px] rounded-2xl border border-white bg-white p-6 shadow-[0_20px_55px_rgba(53,67,87,0.16)] sm:p-7">
        <Link
          href={paths.teacherBankDetails()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#222] transition hover:text-[#53a2eb]"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="mt-2 text-center">
          <h1 className="text-2xl font-bold text-[#111] sm:text-[28px]">
            Add Bank Account
          </h1>
          <p className="mx-auto mt-2 max-w-[310px] text-xs leading-5 text-[#666]">
            Lorem ipsum dolor sit amet consectetur. In ornare lorem at sociis.
          </p>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-xs font-medium text-[#222]">
            Account Number
            <input
              name="accountNumber"
              type="text"
              inputMode="numeric"
              placeholder="Enter account number"
              className={inputClassName}
            />
          </label>

          <label className="block text-xs font-medium text-[#222]">
            Account Holder Name
            <input
              name="accountHolderName"
              type="text"
              placeholder="Enter account holder name"
              className={inputClassName}
            />
          </label>

          <label className="block text-xs font-medium text-[#222]">
            Routing Number
            <input
              name="routingNumber"
              type="text"
              inputMode="numeric"
              placeholder="Enter routing number"
              className={inputClassName}
            />
          </label>

          <label className="block text-xs font-medium text-[#222]">
            Bank Name
            <input
              name="bankName"
              type="text"
              placeholder="Enter bank name"
              className={inputClassName}
            />
          </label>

          <button
            type="submit"
            className="h-14 w-full rounded-lg bg-[#53a2eb] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df]"
          >
            Save
          </button>
        </form>
      </section>
    </main>
  );
}
