import { DataLoader } from "@/components/loaders/data-loader";
import { UpdateProfileForm } from "@/features/user/components/update-profile-form";
import { Suspense } from "react";

export default function EditProfilePage() {
  return (
    <Suspense fallback={<DataLoader />}>
      <UpdateProfileForm />
    </Suspense>
  );
}
