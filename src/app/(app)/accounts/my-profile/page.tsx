import { DataLoader } from "@/components/loaders/data-loader";
import { UserProfileCard } from "@/features/user/components/user-profile-card";
import { Suspense } from "react";

export default function MyProfile() {
  return (
    <Suspense fallback={<DataLoader />}>
      <UserProfileCard />
    </Suspense>
  );
}
