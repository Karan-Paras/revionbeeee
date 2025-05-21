import { auth } from "@/auth";
import { getProfile } from "@/features/user/api/get-profile";
import { UserProfileCard } from "@/features/user/components/user-profile-card";
import { Suspense } from "react";

async function MyProfileContent() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const token = session?.user.token;

  const initialData = await getProfile(session?.user.token);
  return (
    <Suspense fallback={<p>content loading....</p>}>
      <UserProfileCard initialData={initialData} token={token} />
    </Suspense>
  );
}

export default function MyProfilePage() {
  return (
    <Suspense fallback={<p>page loading....</p>}>
      <MyProfileContent />
    </Suspense>
  );
}
