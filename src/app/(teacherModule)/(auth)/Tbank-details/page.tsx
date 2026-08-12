"use client";

import { ConnectStripeButton } from "@/features/teacher/components/connect-stripe-button";
import { useBankAccountStore } from "@/features/teacher/stores/use-bank-account-store";
import { paths } from "@/routes";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TeacherBankDetails() {
  const accounts = useBankAccountStore((state) => state.accounts);
  const removeAccount = useBankAccountStore((state) => state.removeAccount);

  return (
    <main className="h-dvh overflow-hidden bg-[#444] p-1.5">
      <div className="mx-auto grid h-full max-w-[1440px] overflow-hidden rounded-xl bg-[#f4f4f4] lg:grid-cols-2">
        <section className="flex h-full items-center justify-center overflow-hidden px-6 py-5 sm:px-12">
          <div className="w-full max-w-[470px]">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
                Bank Details
              </h1>
              <p className="mt-2 text-xs text-[#555] sm:text-sm">
                Add your bank details to receive payments securely.
              </p>
            </div>

            <div className="mt-7 flex gap-1.5" aria-label="Step 5 of 6">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={`complete-${index}`}
                  className="h-1.5 w-12 rounded-full bg-[#fbbe1b]"
                />
              ))}
              <span className="h-1.5 w-12 rounded-full bg-[#d1d1d1]" />
            </div>

            {accounts.length === 0 ? (
              <div className="mt-16 text-center sm:mt-20">
                <Image
                  src="/images/teacher-bank.png"
                  alt="Bank building representing payment details"
                  width={250}
                  height={160}
                  className="mx-auto h-[150px] w-[235px] object-contain mix-blend-multiply"
                />
                <h2 className="mt-2 text-base font-bold text-[#111]">
                  Add your bank details
                </h2>
                <p className="mt-1 text-xs text-[#666]">
                  Add your payment information securely.
                </p>
              </div>
            ) : (
              <div className="mt-8 max-h-[300px] space-y-3 overflow-y-auto pr-2">
                {accounts.map((account) => (
                  <article
                    key={account.id}
                    className="relative rounded-xl bg-white p-4 pr-10 shadow-sm"
                  >
                    <div className="flex items-center gap-3 border-b border-[#eee] pb-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#174ea6] text-[9px] font-bold text-white">
                        VISA
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-[#111]">
                          {account.bankName}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#555]">
                          XXXX XXXX {account.accountNumber.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-4 text-[9px]">
                      <div>
                        <dt className="text-[#777]">Account Holder Name</dt>
                        <dd className="mt-1 truncate font-semibold uppercase text-[#111]">
                          {account.accountHolderName}
                        </dd>
                      </div>
                      <div className="text-right">
                        <dt className="text-[#777]">Routing Number</dt>
                        <dd className="mt-1 truncate font-semibold text-[#111]">
                          {account.routingNumber}
                        </dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      aria-label="Remove bank account"
                      onClick={() => removeAccount(account.id)}
                      className="absolute top-4 right-3 text-[#ff3547]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </article>
                ))}
              </div>
            )}

            <ConnectStripeButton className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-dashed border-[#bdbdbd] bg-white text-sm text-[#777] transition hover:border-[#53a2eb] hover:text-[#53a2eb] disabled:cursor-not-allowed disabled:opacity-60">
              <Plus size={17} strokeWidth={1.5} />
              Add
            </ConnectStripeButton>

            <div className="mt-20 sm:mt-24">
              <Link
                href={paths.teacherProfileCreated()}
                aria-disabled={accounts.length === 0}
                className={`grid h-12 w-full place-items-center rounded-lg text-sm font-medium ${accounts.length === 0 ? "pointer-events-none bg-[#d2d2d2] text-[#777]" : "bg-[#53a2eb] text-white hover:bg-[#4395df]"}`}
              >
                Save &amp; Next
              </Link>
            </div>
          </div>
        </section>

        <section className="relative hidden h-full overflow-hidden rounded-xl border-2 border-white lg:block">
          <Image
            src="/images/teacher-personal-info.svg"
            alt="Teacher presenting a lesson at a whiteboard"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </section>
      </div>
    </main>
  );
}
