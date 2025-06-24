import { RegisterForm } from "@/features/auth/components/register-form";

import { RevisionBee } from "@/lib/icons";

export default function Signup() {
  return (
    <div className="mx-auto h-full w-full max-w-md content-center md:w-11/12">
      <div className="icn flex justify-center">
        <span>
          <RevisionBee />
        </span>
      </div>
      <div className="hed my-3.5 text-center">
        <h1 className="mb-2 text-center text-2xl font-bold md:text-3xl">
          Let&apos;s get started.
        </h1>
        <p className="text-sm text-[#505050]">
          Create an account by filling in the information belows
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
