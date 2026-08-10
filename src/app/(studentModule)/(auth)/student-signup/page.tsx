import { RevisionBee } from "@/assets/icons";
import { RegisterForm } from "@/features/auth/components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Sign Up - Revision Bee",
  description: "Create your Revision Bee student account.",
};

export default function StudentSignup() {
  return (
    <div className="mx-auto h-full w-full max-w-md content-center md:w-11/12">
      <div className="flex justify-center">
        <RevisionBee />
      </div>
      <div className="my-3.5 text-center">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          Let&apos;s get started.
        </h1>
        <p className="text-sm text-[#505050]">
          Create an account by filling in the information below
        </p>
      </div>
      <RegisterForm userType="student" />
    </div>
  );
}
