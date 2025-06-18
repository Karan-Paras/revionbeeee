import { RegisterForm } from "@/features/auth/components/register-form";

import { RevisionBee } from "@/lib/icons";

export default function Signup() {
  return (
    <div className="mx-auto max-w-md md:w-11/12 w-full h-full content-center">
      <div className="icn flex justify-center">
        <span>
          <RevisionBee />
        </span>
      </div>
      <div className="hed my-3.5 text-center">
        <h1 className="md:text-3xl text-2xl font-bold text-center mb-2">
          Let&apos;s get started.
        </h1>
        <p className="text-[#505050] text-sm">
          Create an account by filling in the information belows
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
