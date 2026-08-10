import { CreateProfileForm } from "@/features/user/components/create-profile-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Profile - Revision Bee",
  description: "Complete your profile to personalize your learning experience.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CreateProfile() {
  return (
    <div className="mx-auto h-full w-11/12 max-w-md content-center">
      <div className="hed my-3.5 text-center">
        <h1 className="mb-2 text-center text-3xl font-bold">Create profile</h1>
        <p className="text-sm text-[#505050]">
          Enter your profile details to continue.
        </p>
      </div>
      <CreateProfileForm />
    </div>
  );
}
