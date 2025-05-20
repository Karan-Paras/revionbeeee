import { DataLoader } from "@/components/loaders/data-loader";
import { getProfile } from "@/features/user/api/get-profile";
import { UpdateProfileForm } from "@/features/user/components/update-profile-form";
import { Suspense } from "react";

async function UpdateProfileContent() {
  const json = await getProfile();

  const user = json.data;

  return <UpdateProfileForm userData={user} />;
}

export default function UpdateProfile() {
  return (
    <Suspense fallback={<DataLoader />}>
      <UpdateProfileContent />
    </Suspense>
  );
}
