"use client";

import { ErrorBlock } from "@/components/errors/error-block";
import { changePassword } from "@/features/auth/actions/change-password";
import { newPassword } from "@/features/auth/schemas";
import { ContactUsSchema } from "@/features/support/schemas";
import { fetchClient } from "@/lib/fetch-client";
import {
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Eye,
  EyeOff,
  Headphones,
  ListChecks,
  LockKeyhole,
  Mail,
  MessageSquare,
  Paperclip,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { toast } from "sonner";

const settingsItems = [
  { label: "Change Password", icon: LockKeyhole },
  { label: "Contact Us", icon: Headphones },
  { label: "About Us", icon: CircleHelp },
  { label: "Privacy Policies", icon: ClipboardList },
  { label: "Terms & Conditions", icon: ListChecks },
] as const;

type SettingsSection = (typeof settingsItems)[number]["label"];

type ContactFormErrors = Partial<
  Record<"email" | "subject" | "message" | "attachment", string[]>
>;

const sectionCopy: Record<SettingsSection, string> = {
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
      : pathname === "/teacher/settings/contact-us"
        ? "Contact Us"
        : pathname === "/teacher/settings/about-us"
          ? "About Us"
          : pathname === "/teacher/settings/privacy-policies"
            ? "Privacy Policies"
            : pathname === "/teacher/settings/terms-and-conditions"
              ? "Terms & Conditions"
              : "Contact Us";
  const [activeSection, setActiveSection] =
    useState<SettingsSection>(routeSection);
  const [visiblePasswords, setVisiblePasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [attachmentName, setAttachmentName] = useState("");
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});
  const [passwordFormState, passwordAction, isChangingPassword] =
    useActionState(changePassword, { errors: {} });
  const passwordFormRef = useRef<HTMLFormElement | null>(null);
  const [passwordFieldErrors, setPasswordFieldErrors] = useState<{
    current?: string;
    new?: string;
    confirm?: string;
  }>({});

  useEffect(() => {
    if (passwordFormState.success) {
      passwordFormRef.current?.reset();
      setPasswordFieldErrors({});
      toast.success("Password changed successfully!");
    }
  }, [passwordFormState.success]);

  function validatePasswordFieldLive(
    key: "current" | "new" | "confirm",
    input: HTMLInputElement
  ) {
    const value = input.value;

    if (key === "current") {
      setPasswordFieldErrors((errors) => ({
        ...errors,
        current: value.length === 0 ? "Password is required" : undefined,
      }));
      return;
    }

    if (key === "new") {
      setPasswordFieldErrors((errors) => ({
        ...errors,
        new: value.length === 0 ? "Password is required" : undefined,
      }));

      if (value.length > 0) {
        const result = newPassword.safeParse(value);
        setPasswordFieldErrors((errors) => ({
          ...errors,
          new: result.success ? undefined : result.error.issues[0]?.message,
        }));
      }

      // Re-validate confirm password since the new password has changed
      const confirmInput = input.form?.elements.namedItem(
        "confirm-password"
      ) as HTMLInputElement | null;
      if (confirmInput && confirmInput.value.length > 0) {
        setPasswordFieldErrors((errors) => ({
          ...errors,
          confirm:
            confirmInput.value === value ? undefined : "Passwords don't match",
        }));
      }
      return;
    }

    const newPasswordValue = input.form?.elements.namedItem(
      "new-password"
    ) as HTMLInputElement | null;
    setPasswordFieldErrors((errors) => ({
      ...errors,
      confirm:
        value.length === 0
          ? "Confirm password is required"
          : value !== newPasswordValue?.value
            ? "Passwords don't match"
            : undefined,
    }));
  }

  function validateContactField(
    key: "email" | "subject" | "message",
    value: string
  ) {
    if (value.trim().length === 0) {
      setContactErrors((errors) => ({
        ...errors,
        [key]: ["This field is required"],
      }));
      return;
    }

    const schema =
      key === "email"
        ? ContactUsSchema.shape.email
        : key === "subject"
          ? ContactUsSchema.shape.subject
          : ContactUsSchema.shape.message;

    const result = schema.safeParse(value);
    setContactErrors((errors) => ({
      ...errors,
      [key]: result.success
        ? undefined
        : result.error.issues.map((issue) => issue.message),
    }));
  }

  function validateContactFile(file: File | undefined) {
    if (!file) {
      setAttachmentName("");
      setContactErrors((errors) => ({ ...errors, attachment: undefined }));
      return;
    }
    setAttachmentName(file.name);
    const result = ContactUsSchema.shape.attachment.safeParse(file);
    setContactErrors((errors) => ({
      ...errors,
      attachment: result.success
        ? undefined
        : result.error.issues.map((issue) => issue.message),
    }));
  }

  function changeSection(section: SettingsSection) {
    const destination =
      section === "Change Password"
        ? "/teacher/settings/change-password"
        : section === "Contact Us"
          ? "/teacher/settings/contact-us"
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
  }

  function submitPasswordForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentPassword = formData.get("current-password")?.toString() ?? "";
    const nextPassword = formData.get("new-password")?.toString() ?? "";
    const confirmPassword = formData.get("confirm-password")?.toString() ?? "";
    const nextPasswordValidation = newPassword.safeParse(nextPassword);
    const errors = {
      current: currentPassword ? undefined : "Password is required",
      new: nextPassword
        ? nextPasswordValidation.success
          ? undefined
          : nextPasswordValidation.error.issues[0]?.message
        : "Password is required",
      confirm: confirmPassword
        ? confirmPassword === nextPassword
          ? undefined
          : "Passwords don't match"
        : "Confirm password is required",
    };

    setPasswordFieldErrors(errors);

    if (errors.current || errors.new || errors.confirm) {
      return;
    }

    startTransition(() => passwordAction(formData));
  }

  async function submitContactForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const attachment = formData.get("attachment");
    const validation = ContactUsSchema.safeParse({
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      attachment:
        attachment instanceof File && attachment.size > 0
          ? attachment
          : undefined,
    });

    if (!validation.success) {
      setContactErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setContactErrors({});
    formData.set("email", validation.data.email);
    formData.set("subject", validation.data.subject);
    formData.set("message", validation.data.message);
    if (!validation.data.attachment) formData.delete("attachment");

    setIsSendingMessage(true);
    try {
      await fetchClient("/contact/us", "POST", formData);
      form.reset();
      setAttachmentName("");
      setContactErrors({});
      toast.success("Your message has been sent successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to send your message."
      );
    } finally {
      setIsSendingMessage(false);
    }
  }

  return (
    <main className="min-h-full bg-[#f5f6f8] p-4 sm:p-8 lg:px-9 lg:py-9">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-[22px] font-bold leading-tight text-[#111]">
          Settings
        </h1>

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

            {activeSection === "Change Password" ? (
              <form
                ref={passwordFormRef}
                onSubmit={submitPasswordForm}
                className="mt-5 border-t border-[#edf0f2] pt-5"
              >
                <div className="space-y-5">
                  {(
                    [
                      {
                        key: "current",
                        name: "current-password",
                        errorKey: "currentPassword",
                        label: "Current Password",
                        placeholder: "Enter password",
                      },
                      {
                        key: "new",
                        name: "new-password",
                        errorKey: "newPassword",
                        label: "New Password",
                        placeholder: "Enter password",
                      },
                      {
                        key: "confirm",
                        name: "confirm-password",
                        errorKey: "confirmPassword",
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
                            name={field.name}
                            type={isVisible ? "text" : "password"}
                            placeholder={field.placeholder}
                            autoComplete={
                              field.key === "current"
                                ? "current-password"
                                : "new-password"
                            }
                            disabled={isChangingPassword}
                            className={`${inputClassName} pr-12 pl-11`}
                            onChange={(event) =>
                              validatePasswordFieldLive(
                                field.key,
                                event.currentTarget
                              )
                            }
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
                        {(passwordFieldErrors[field.key] ??
                          passwordFormState.errors[field.errorKey]?.[0]) && (
                          <span className="mt-1 block text-[10px] text-red-500">
                            {passwordFieldErrors[field.key] ??
                              passwordFormState.errors[field.errorKey]?.[0]}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-5">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="h-12 w-full rounded-lg bg-[#53a2eb] text-xs font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[290px]"
                  >
                    {isChangingPassword ? "Updating..." : "Update"}
                  </button>
                </div>
                <ErrorBlock errors={passwordFormState.errors._form} />
              </form>
            ) : activeSection === "Contact Us" ? (
              <form
                onSubmit={submitContactForm}
                className="mt-5 border-t border-[#edf0f2] pt-5"
              >
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-[#222]">
                    Email address
                    <span className="relative mt-2 block">
                      <Mail
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a5a9ad]"
                        size={17}
                        strokeWidth={1.6}
                      />
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="john@example.com"
                        disabled={isSendingMessage}
                        className={`${inputClassName} pl-11`}
                        onChange={(event) =>
                          validateContactField(
                            "email",
                            event.currentTarget.value
                          )
                        }
                      />
                    </span>
                    {contactErrors.email?.[0] && (
                      <span className="mt-1 block text-[10px] text-red-500">
                        {contactErrors.email[0]}
                      </span>
                    )}
                  </label>

                  <label className="block text-xs font-medium text-[#222]">
                    Subject
                    <span className="relative mt-2 block">
                      <ClipboardList
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a5a9ad]"
                        size={17}
                        strokeWidth={1.6}
                      />
                      <input
                        name="subject"
                        type="text"
                        placeholder="Enter subject"
                        disabled={isSendingMessage}
                        className={`${inputClassName} pl-11`}
                        onChange={(event) =>
                          validateContactField(
                            "subject",
                            event.currentTarget.value
                          )
                        }
                      />
                    </span>
                    {contactErrors.subject?.[0] && (
                      <span className="mt-1 block text-[10px] text-red-500">
                        {contactErrors.subject[0]}
                      </span>
                    )}
                  </label>

                  <label className="block text-xs font-medium text-[#222]">
                    Message
                    <span className="relative mt-2 block">
                      <MessageSquare
                        className="pointer-events-none absolute top-4 left-4 text-[#a5a9ad]"
                        size={17}
                        strokeWidth={1.6}
                      />
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Write your message"
                        disabled={isSendingMessage}
                        className="min-h-[105px] w-full resize-y rounded-lg border border-[#dce1e5] bg-[#fbfcfd] px-4 py-3 pl-11 text-xs text-[#222] outline-none transition placeholder:text-[#a1a5aa] focus:border-[#53a2eb] focus:bg-white focus:ring-4 focus:ring-[#53a2eb]/10"
                        onChange={(event) =>
                          validateContactField(
                            "message",
                            event.currentTarget.value
                          )
                        }
                      />
                    </span>
                    {contactErrors.message?.[0] && (
                      <span className="mt-1 block text-[10px] text-red-500">
                        {contactErrors.message[0]}
                      </span>
                    )}
                  </label>

                  <label className="block text-xs font-medium text-[#222]">
                    Photo
                    <span className="mt-2 flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#cfd7df] bg-[#fbfcfd] px-4 py-3 text-[#777] transition hover:border-[#53a2eb] hover:bg-[#f8fbff]">
                      <Paperclip
                        className="shrink-0 text-[#53a2eb]"
                        size={18}
                        strokeWidth={1.7}
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {attachmentName || "Choose an image"}
                      </span>
                      <span className="rounded-md bg-[#eaf5ff] px-3 py-1.5 font-semibold text-[#53a2eb]">
                        Browse
                      </span>
                      <input
                        name="attachment"
                        type="file"
                        accept="image/*"
                        disabled={isSendingMessage}
                        className="sr-only"
                        onChange={(event) =>
                          validateContactFile(event.target.files?.[0])
                        }
                      />
                    </span>
                    <span className="mt-1.5 block text-[10px] font-normal text-[#92979c]">
                      Accepted: image files only, maximum size 5 MB.
                    </span>
                    {contactErrors.attachment?.[0] && (
                      <span className="mt-1 block text-[10px] text-red-500">
                        {contactErrors.attachment[0]}
                      </span>
                    )}
                  </label>
                </div>

                <div className="flex justify-end pt-5">
                  <button
                    type="submit"
                    disabled={isSendingMessage}
                    className="h-12 w-full rounded-lg bg-[#53a2eb] text-xs font-semibold text-white shadow-[0_8px_20px_rgba(83,162,235,0.2)] transition hover:bg-[#4395df] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[290px]"
                  >
                    {isSendingMessage ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            ) : activeSection === "Terms & Conditions" ? (
              <article className="mt-5 border-t border-[#edf0f2] pt-5 text-[11px] leading-[1.7] text-[#555] sm:text-xs">
                <section>
                  <h3 className="text-sm font-semibold text-[#222]">
                    AGREEMENT TO TERMS
                  </h3>
                  <p className="mt-3">
                    Welcome to RevisionBee.com (“Revision Bee”, “we”, “our”, or
                    “us”). By accessing or using this website, you agree to be
                    bound by the following Terms and Conditions. These terms
                    apply to all users of the Site and govern your access to the
                    features, content, and educational tools provided by
                    Revision Bee (collectively referred to as the “Site”).
                  </p>
                  <p className="mt-4">
                    Please read these Terms carefully. If you do not agree with
                    any part of them, please do not use the Site.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    1. Acceptance of Terms
                  </h3>
                  <p className="mt-3">
                    By continuing to use RevisionBee.com, you confirm that you
                    understand and agree to these Terms and Conditions. Your use
                    of the Site constitutes a legally binding agreement between
                    you and Revision Bee.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    2. Purpose of the Site
                  </h3>
                  <p className="mt-3">
                    Revision Bee is an open-access educational platform designed
                    to help students — especially those preparing for the
                    International Baccalaureate (IB) — improve their mathematics
                    skills. We provide interactive quizzes, question banks,
                    progress tracking, and video explanations of topics to
                    support deeper understanding.
                  </p>
                  <p className="mt-4">
                    All features are openly available to users without hidden
                    restrictions or locked content.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    3. User Conduct
                  </h3>
                  <p className="mt-3">
                    We ask that you use the Site responsibly and only for
                    educational purposes. You agree not to misuse any content or
                    features of the Site, interfere with its functionality, or
                    attempt to disrupt the learning experience of others.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    4. Age Requirement
                  </h3>
                  <p className="mt-3">
                    The platform is designed for students aged 10 and above. If
                    you are under 18, you must use the Site with the consent and
                    guidance of a parent or guardian.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    5. Updates to Terms
                  </h3>
                  <p className="mt-3">
                    We may update these Terms occasionally to reflect changes to
                    the Site or our services. When we do, we will revise the
                    “Last Updated” date at the top of this page. Continued use
                    of the Site after such changes will be considered your
                    acceptance of the revised Terms.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    6. Contact Us
                  </h3>
                  <p className="mt-3">
                    If you have any questions about these Terms, or suggestions
                    for improving the Site, feel free to reach out:
                  </p>
                  <a
                    className="mt-2 inline-block font-medium text-[#53a2eb] hover:underline"
                    href="mailto:support@revisionbee.com"
                  >
                    support@revisionbee.com
                  </a>
                </section>
              </article>
            ) : activeSection === "About Us" ? (
              <article className="mt-5 border-t border-[#edf0f2] pt-5 text-[11px] leading-[1.7] text-[#555] sm:text-xs">
                <section>
                  <h3 className="text-sm font-semibold text-[#222]">
                    About Us - Revision Bee
                  </h3>
                  <p className="mt-3">
                    At Revision Bee, we believe every student deserves access to
                    high-quality math resources. Our mission is to make IB Math
                    preparation engaging, effective, and accessible for learners
                    around the world.
                  </p>
                  <p className="mt-3">
                    Built by experienced educators, Revision Bee offers:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>
                      A broad question bank with IB-style problems tailored to
                      your syllabus
                    </li>
                    <li>
                      Interactive quizzes that adapt to your progress and skill
                      level
                    </li>
                    <li>
                      Progress tracking to monitor growth and identify areas for
                      improvement
                    </li>
                    <li>
                      Topic explanations and strategy breakdowns to support
                      step-by-step learning
                    </li>
                  </ul>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    Track Your Progress
                  </h3>
                  <p className="mt-3">
                    As you complete quizzes and challenges, Revision Bee keeps
                    track of your scores, completed topics, and improvement over
                    time.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    Three Difficulty Levels
                  </h3>
                  <p className="mt-3">
                    Every learner works at their own pace, so Revision Bee
                    offers questions across three clear difficulty levels:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>
                      <strong className="font-semibold text-[#222]">
                        BuzzEasy:
                      </strong>{" "}
                      quick warm-ups that build confidence and reinforce core
                      skills.
                    </li>
                    <li>
                      <strong className="font-semibold text-[#222]">
                        HoneyChallenge:
                      </strong>{" "}
                      multi-step problems that combine ideas and deepen
                      understanding.
                    </li>
                    <li>
                      <strong className="font-semibold text-[#222]">
                        HiveMaster:
                      </strong>{" "}
                      advanced questions for complex reasoning and
                      problem-solving practice.
                    </li>
                  </ul>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    Coming Soon: Video Tutorials
                  </h3>
                  <p className="mt-3">
                    Some topics need extra explanation, so we are creating
                    Revision Bee video tutorials for selected topics. These
                    videos will walk students through key strategies, worked
                    examples, and revision tips before exams.
                  </p>
                  <p className="mt-3">
                    Join Revision Bee and take your IB Math revision to the next
                    level.
                  </p>
                  <p className="mt-3 font-semibold text-[#222]">
                    Revision Bee - Smart Math. Sweet Success.
                  </p>
                </section>
              </article>
            ) : activeSection === "Privacy Policies" ? (
              <article className="mt-5 border-t border-[#edf0f2] pt-5 text-[11px] leading-[1.7] text-[#555] sm:text-xs">
                <section>
                  <p>
                    At RevisionBee, your privacy is important to us. This policy
                    explains what data we collect, how we use it, and what your
                    rights are.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    1. What do we do with your information?
                  </h3>
                  <p className="mt-3">
                    When you create an account or make a payment, we collect
                    basic personal information such as your email address, login
                    credentials, and (optionally) a profile picture.
                  </p>
                  <p className="mt-3">We use this information to:</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>
                      Provide access to quizzes, question banks, and video
                      resources
                    </li>
                    <li>Manage your subscription and payment status</li>
                    <li>Ensure the platform functions properly</li>
                  </ul>
                  <p className="mt-3">
                    We do not sell or share your information for marketing
                    purposes.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    2. Consent
                  </h3>
                  <p className="mt-3">
                    By using our website and registering for an account, you
                    consent to the collection and use of your information as
                    described in this policy. You may withdraw your consent at
                    any time by requesting to delete your account.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    3. Disclosure
                  </h3>
                  <p className="mt-3">
                    We will never share your personal information unless legally
                    required to do so (e.g., a valid court order).
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    4. Third-party services
                  </h3>
                  <p className="mt-3">
                    We use Stripe to securely process payments. When you
                    subscribe to a paid plan, your payment details are handled
                    directly by Stripe. We do not store your credit card or
                    billing information on our servers. Stripe&apos;s use of
                    your data is governed by their own Privacy Policy.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    5. Security
                  </h3>
                  <p className="mt-3">
                    We implement standard industry security measures to protect
                    your information. Account data is stored securely, and
                    payment processing is handled through encrypted and
                    PCI-compliant methods via Stripe.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    6. Cookies
                  </h3>
                  <p className="mt-3">We use essential cookies to:</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>Keep you logged in</li>
                    <li>Maintain basic session functionality</li>
                  </ul>
                  <p className="mt-3">
                    We do not use third-party advertising or tracking cookies.
                  </p>
                </section>

                <section className="mt-5">
                  <h3 className="text-sm font-semibold text-[#222]">
                    📧 Contact Us
                  </h3>
                  <p className="mt-3">
                    If you have any questions about this policy or your data,
                    please contact:
                  </p>
                  <a
                    className="mt-2 inline-block font-medium text-[#53a2eb] hover:underline"
                    href="mailto:support@revisionbee.com"
                  >
                    support@revisionbee.com
                  </a>
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
