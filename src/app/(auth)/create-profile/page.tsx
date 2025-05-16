import { CreateProfileForm } from "@/features/auth/components/create-profile-form";

export default function CreateProfile() {
  return (
    <div className="mx-auto max-w-md w-11/12 h-full content-center">
      <div className="hed my-3.5 text-center">
        <h1 className="text-3xl font-bold text-center mb-2">Create profile</h1>
        <p className="text-[#505050] text-sm">
          Enter your profile details to continue.
        </p>
      </div>
      <CreateProfileForm />
    </div>
  );
}
