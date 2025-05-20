import { getProfile } from "@/features/user/api/get-profile";
import { UpdateProfileForm } from "@/features/user/components/update-profile-form";

export default async function UpdateProfile() {
  const json = await getProfile();

  const user = json.data;

  return <UpdateProfileForm userData={user} />;
}
