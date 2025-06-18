import { LoginForm } from "@/features/auth/components/login-form";

import { RevisionBee } from "@/lib/icons";

export default function Login() {
  return (
    <div className="mx-auto max-w-md md:w-11/12 w-full h-full content-center">
      <div className="icn flex justify-center">
        <span>
          <RevisionBee />
        </span>
      </div>
      <div className="hed my-3.5 text-center">
        <h1 className="md:text-2xl text-xl font-bold text-center mb-2">
          Welcome to Revision Bee
        </h1>
        <p className="text-[#505050] text-sm">
          Master your exams with smart, simple, and engaging revision tools and
          tips
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
