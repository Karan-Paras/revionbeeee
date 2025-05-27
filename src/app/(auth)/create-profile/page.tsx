"use client";

import { CreateProfileForm } from "@/features/user/components/create-profile-form";
import { isUserProfileComplete } from "@/features/user/utils";
import { paths } from "@/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateProfile() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (
    status === "loading" ||
    (session?.user && !isUserProfileComplete(session?.user))
  ) {
    return (
      <div className="mx-auto max-w-md w-11/12 h-full content-center">
        <div className="hed my-3.5 text-center">
          <h1 className="text-3xl font-bold text-center mb-2">
            Create profile
          </h1>
          <p className="text-[#505050] text-sm">
            Enter your profile details to continue.
          </p>
        </div>
        <CreateProfileForm />
      </div>
    );
  }
  router.replace(paths.home());
  return null;
}
