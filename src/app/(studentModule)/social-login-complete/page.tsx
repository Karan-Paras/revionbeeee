import { auth } from "@/auth";
import { SOCIAL_AUTH_INTENT_COOKIE } from "@/features/auth/constants";
import { getPostLoginPath } from "@/features/auth/utils";
import { paths } from "@/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SocialLoginComplete() {
  const session = await auth();
  if (!session?.user) redirect(paths.login());

  const cookieStore = await cookies();
  const intent = cookieStore.get(SOCIAL_AUTH_INTENT_COOKIE)?.value;

  if (intent === "login") {
    redirect(
      getPostLoginPath(
        session.user.userType,
        session.user.teacherProfileStatus,
        session.user.profileStatus,
        session.user.isSubscribed,
        session.user.created_at,
        false
      )
    );
  }

  redirect(
    session.user.userType === "teacher"
      ? paths.teacherPersonalInfo()
      : paths.createProfile()
  );
}
