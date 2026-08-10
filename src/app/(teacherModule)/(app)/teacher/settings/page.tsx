"use client";

import {
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Eye,
  EyeOff,
  Headphones,
  Landmark,
  ListChecks,
  LockKeyhole,
  Plus,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

const settingsItems = [
  { label: "Bank Details", icon: Landmark },
  { label: "Change Password", icon: LockKeyhole },
  { label: "Contact Us", icon: Headphones },
  { label: "About Us", icon: CircleHelp },
  { label: "Privacy Policies", icon: ClipboardList },
  { label: "Terms & Conditions", icon: ListChecks },
] as const;

type SettingsSection = (typeof settingsItems)[number]["label"];

const sectionCopy: Record<Exclude<SettingsSection, "Bank Details">, string> = {
  "Change Password":
    "Update your password and keep your teacher account secure.",
  "Contact Us": "Get in touch with the Revision Bee support team.",
  "About Us": "Learn more about Revision Bee and our teaching community.",
  "Privacy Policies":
    "Review how Revision Bee handles and protects your information.",
  "Terms & Conditions": "Read the terms that apply when using Revision Bee.",
};

const inputClassName =
  "h-11 w-full rounded-lg border border-[#dce1e5] bg-[#fbfcfd] px-4 text-xs text-[#222] outline-none transition placeholder:text-[#a1a5aa] focus:border-[#53a2eb] focus:bg-white focus:ring-4 focus:ring-[#53a2eb]/10";

export default function TeacherSettingsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const routeSection: SettingsSection =
    pathname === "/teacher/settings/change-password"
      ? "Change Password"
      : pathname === "/teacher/settings/about-us"
        ? "About Us"
        : pathname === "/teacher/settings/privacy-policies"
          ? "Privacy Policies"
          : pathname === "/teacher/settings/terms-and-conditions"
            ? "Terms & Conditions"
            : "Bank Details";
  const [activeSection, setActiveSection] =
    useState<SettingsSection>(routeSection);
  const [showBankForm, setShowBankForm] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  function saveBankAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowBankForm(false);
    toast.success("Bank account added successfully");
  }

  function changeSection(section: SettingsSection) {
    const destination =
      section === "Bank Details"
        ? "/teacher/settings"
        : section === "Change Password"
          ? "/teacher/settings/change-password"
          : section === "About Us"
            ? "/teacher/settings/about-us"
            : section === "Privacy Policies"
              ? "/teacher/settings/privacy-policies"
              : section === "Terms & Conditions"
                ? "/teacher/settings/terms-and-conditions"
                : undefined;

    if (destination && destination !== pathname) {
      router.push(destination);
      return;
    }

    setActiveSection(section);
    setShowBankForm(false);
  }

  function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    event.currentTarget.reset();
    toast.success("Password updated successfully");
  }

  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-[22px] font-bold leading-tight text-[#111]">
          Settings
        </h1>
        <p className="mt-2 text-xs text-[#6f7378] sm:text-sm">
          Lorem ipsum dolor sit amet consectetur. Varius eu fermentum arcu lacus
          lacus. Adipiscing egestas pretium rhoncus.
        </p>

        <div className="mt-8 grid items-start gap-7 lg:grid-cols-[320px_1fr]">
          <nav className="space-y-4" aria-label="Settings sections">
            {settingsItems.map(({ label, icon: Icon }) => {
              const isActive = activeSection === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => changeSection(label)}
                  className={`flex h-[58px] w-full items-center gap-4 rounded-xl px-5 text-left text-sm font-medium shadow-[0_5px_12px_rgba(30,40,50,0.10)] transition ${isActive ? "bg-[#fbbd1b] text-[#151515]" : "bg-white text-[#565a5e] hover:bg-[#f9fbfc]"}`}
                >
                  <Icon size={21} strokeWidth={1.7} />
                  <span className="flex-1">{label}</span>
                  <ChevronRight size={20} strokeWidth={1.8} />
                </button>
              );
            })}
          </nav>

          <section className="min-h-[270px] rounded-[22px] bg-white px-5 py-6 shadow-[0_1px_3px_rgba(20,30,40,0.03)] sm:px-8">
            <h2 className="text-sm font-bold text-[#202020]">
              {activeSection}
            </h2>

            {activeSection === "Bank Details" ? (
              showBankForm ? (
                <form
                  onSubmit={saveBankAccount}
                  className="mt-5 grid gap-4 rounded-xl border border-[#e3e6e9] bg-[#fcfcfd] p-5 sm:grid-cols-2"
                >
                  <label className="text-xs font-medium text-[#333]">
                    Account Holder
                    <input
                      required
                      name="accountHolder"
                      placeholder="Enter account holder"
                      className={`${inputClassName} mt-2`}
                    />
                  </label>
                  <label className="text-xs font-medium text-[#333]">
                    Bank Name
                    <input
                      required
                      name="bankName"
                      placeholder="Enter bank name"
                      className={`${inputClassName} mt-2`}
                    />
                  </label>
                  <label className="text-xs font-medium text-[#333]">
                    Account Number
                    <input
                      required
                      name="accountNumber"
                      inputMode="numeric"
                      placeholder="Enter account number"
                      className={`${inputClassName} mt-2`}
                    />
                  </label>
                  <label className="text-xs font-medium text-[#333]">
                    Routing / SWIFT Code
                    <input
                      required
                      name="routingCode"
                      placeholder="Enter routing code"
                      className={`${inputClassName} mt-2`}
                    />
                  </label>
                  <div className="flex gap-3 sm:col-span-2 sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setShowBankForm(false)}
                      className="h-10 flex-1 rounded-lg border border-[#d8dde1] bg-white px-5 text-xs font-medium text-[#555] sm:flex-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="h-10 flex-1 rounded-lg bg-[#53a2eb] px-7 text-xs font-semibold text-white hover:bg-[#4395df] sm:flex-none"
                    >
                      Save Account
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowBankForm(true)}
                  className="mt-5 flex min-h-[145px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#d9dde0] bg-[#fcfcfc] px-5 text-center transition hover:border-[#53a2eb] hover:bg-[#f8fbff]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eceeef] text-[#a6aaae]">
                    <Plus size={25} strokeWidth={1.8} />
                  </span>
                  <span className="mt-5 text-sm font-semibold text-[#222]">
                    Add Bank Account
                  </span>
                  <span className="mt-2 text-[11px] text-[#999]">
                    Lorem ipsum dolor sit amet consectetur. Mattis faucibus
                    dictum turpis quam facilisi duis.
                  </span>
                </button>
              )
            ) : activeSection === "Change Password" ? (
              <form
                onSubmit={updatePassword}
                className="mt-5 border-t border-[#edf0f2] pt-5"
              >
                <div className="space-y-5">
                  {(
                    [
                      {
                        key: "current",
                        name: "currentPassword",
                        label: "Current Password",
                        placeholder: "Enter password",
                      },
                      {
                        key: "new",
                        name: "newPassword",
                        label: "New Password",
                        placeholder: "Enter password",
                      },
                      {
                        key: "confirm",
                        name: "confirmPassword",
                        label: "Confirm password",
                        placeholder: "Confirm password",
                      },
                    ] as const
                  ).map((field) => {
                    const isVisible = visiblePasswords[field.key];
                    return (
                      <label
                        key={field.name}
                        className="block text-xs font-medium text-[#222]"
                      >
                        {field.label}
                        <span className="relative mt-2 block">
                          <LockKeyhole
                            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a5a9ad]"
                            size={17}
                            strokeWidth={1.6}
                          />
                          <input
                            required
                            minLength={8}
                            name={field.name}
                            type={isVisible ? "text" : "password"}
                            placeholder={field.placeholder}
                            className={`${inputClassName} pr-12 pl-11`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setVisiblePasswords((values) => ({
                                ...values,
                                [field.key]: !values[field.key],
                              }))
                            }
                            aria-label={
                              isVisible
                                ? `Hide ${field.label.toLowerCase()}`
                                : `Show ${field.label.toLowerCase()}`
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-[#9da6bd] transition hover:text-[#53a2eb]"
                          >
                            {isVisible ? (
                              <Eye size={17} />
                            ) : (
                              <EyeOff size={17} />
                            )}
                          </button>
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-5">
                  <button
                    type="submit"
                    className="h-12 w-full rounded-lg bg-[#53a2eb] text-xs font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] sm:w-[290px]"
                  >
                    Update
                  </button>
                </div>
              </form>
            ) : activeSection === "About Us" ||
              activeSection === "Privacy Policies" ||
              activeSection === "Terms & Conditions" ? (
              <article className="mt-5 border-t border-[#edf0f2] pt-5 text-[11px] leading-[1.7] text-[#555] sm:text-xs">
                <section>
                  <h3 className="text-sm font-semibold text-[#222]">
                    Lorem ipsum dolor sit amet consectetur. Mattis leo fringilla
                    odio euismod.
                  </h3>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur. Nisi sit nunc ut
                    amet aliquet cursus posuere. Enim amet velit pharetra
                    bibendum. Congue aenean neque non posuere ultrices sed
                    maecenas leo semper. Euismod aliquet massa faucibus
                    vestibulum pretium. Turpis neque sed pulvinar sagittis.
                    Commodo pretium platea enim sit iaculis nulla faucibus.
                    Massa turpis varius lectus nunc turpis nunc sit in. Ut diam
                    lacus euismod facilisis viverra congue.
                  </p>
                  <p className="mt-4">
                    Diam adipiscing eget at eu luctus. Nisl luctus duis felis
                    egestas. Turpis urna purus id velit suspendisse viverra sit.
                    Nisl fringilla lobortis id fermentum. Pretium eget sapien
                    vitae vitae. Turpis nibh aliquam luctus ut varius ac. Mattis
                    lorem porttitor lectus velit imperdiet velit quis ut. Congue
                    sit in velit turpis nulla eu a massa egestas. Odio vel
                    lectus hendrerit libero massa lacus massa in scelerisque.
                    Quis laoreet quisque fermentum non faucibus amet nisl nibh.
                    Etiam habitant nulla duis congue varius lectus proin ornare.
                    Dictumst rhoncus magna hac nunc consequat elementum in.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    Lorem ipsum dolor sit amet consectetur. Mattis leo fringilla
                    odio euismod.
                  </h3>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur. Nisi sit nunc ut
                    amet aliquet cursus posuere. Enim amet velit pharetra
                    bibendum. Congue aenean neque non posuere ultrices sed
                    maecenas leo semper. Euismod aliquet massa faucibus
                    vestibulum pretium. Turpis neque sed pulvinar sagittis.
                    Commodo pretium platea enim sit iaculis nulla faucibus.
                    Massa turpis varius lectus nunc turpis nunc sit in. Ut diam
                    lacus euismod facilisis viverra congue.
                  </p>
                  <p className="mt-4">
                    Diam adipiscing eget at eu luctus. Nisl luctus duis felis
                    egestas. Turpis urna purus id velit suspendisse viverra sit.
                    Nisl fringilla lobortis id fermentum. Pretium eget sapien
                    vitae vitae. Turpis nibh aliquam luctus ut varius ac. Mattis
                    lorem porttitor lectus velit imperdiet velit quis ut. Congue
                    sit in velit turpis nulla eu a massa egestas. Odio vel
                    lectus hendrerit libero massa lacus massa in scelerisque.
                    Quis laoreet quisque fermentum non faucibus amet nisl nibh.
                    Etiam habitant nulla duis congue varius lectus proin ornare.
                    Dictumst rhoncus magna hac nunc consequat elementum in.
                  </p>
                </section>
              </article>
            ) : (
              <div className="mt-5 grid min-h-[180px] place-items-center rounded-xl border border-dashed border-[#dde1e4] bg-[#fcfcfc] px-6 text-center">
                <div>
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#edf7ff] text-[#53a2eb]">
                    {(() => {
                      const Icon =
                        settingsItems.find(
                          (item) => item.label === activeSection
                        )?.icon ?? CircleHelp;
                      return <Icon size={21} />;
                    })()}
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-[#333]">
                    {activeSection}
                  </h3>
                  <p className="mt-2 text-xs text-[#888]">
                    {sectionCopy[activeSection]}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
