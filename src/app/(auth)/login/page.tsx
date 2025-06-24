import { LoginForm } from "@/features/auth/components/login-form";

import { RevisionBee } from "@/lib/icons";

export default function Login() {
  return (
    <div className="mx-auto h-full w-full max-w-md content-center md:w-11/12">
      <div className="icn flex justify-center">
        <span>
          <RevisionBee />
        </span>
      </div>
      <div className="hed my-3.5 text-center">
        <h1 className="mb-2 text-center text-xl font-bold md:text-2xl">
          Welcome to Revision Bee
        </h1>
        <p className="text-sm text-[#505050]">
          Master your exams with smart, simple, and engaging revision tools and
          tips
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
