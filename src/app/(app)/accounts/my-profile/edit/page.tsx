import { auth } from "@/auth";
import { DataLoader } from "@/components/loaders/data-loader";
import { getProfile } from "@/features/user/api/get-profile";
import { UpdateProfileForm } from "@/features/user/components/update-profile-form";
import { Suspense } from "react";

async function EditProfileContent() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const token = session?.user.token;

  const initialData = await getProfile(session?.user.token);
  return (
    <Suspense fallback={<DataLoader />}>
      <UpdateProfileForm initialData={initialData} token={token} />
    </Suspense>
  );
}

export default function EditProfilePage() {
  return (
    <Suspense fallback={<DataLoader />}>
      <EditProfileContent />
    </Suspense>
  );
}
