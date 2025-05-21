import { auth } from "@/auth";
import { DataLoader } from "@/components/loaders/data-loader";
import { getProfile } from "@/features/user/api/get-profile";
import { UpdateProfileForm } from "@/features/user/components/update-profile-form";
import { Suspense } from "react";

export default async function Page() {
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
