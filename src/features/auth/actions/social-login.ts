"use server";

import { signIn } from "@/auth";
import {
  SOCIAL_AUTH_INTENT_COOKIE,
  SOCIAL_DEVICE_TOKEN_COOKIE,
  SOCIAL_LOGIN_ROLE_COOKIE,
} from "@/features/auth/constants";
import { googleCredentials } from "@/features/auth/credentials";
import { paths } from "@/routes";
import { cookies } from "next/headers";

export async function socialLogin(
  provider: "google" | "microsoft-entra-id",
  userType: "student" | "teacher",
  intent: "login" | "register" = "register",
  formData?: FormData
) {
  const isConfigured =
    provider === "google"
      ? Boolean(
          googleCredentials().clientId && googleCredentials().clientSecret
        )
      : Boolean(
          process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
            process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET
        );

  if (!isConfigured) throw new Error(`${provider} OAuth is not configured.`);

  const cookieStore = await cookies();
  const deviceToken = String(formData?.get("deviceToken") ?? "").trim();
  cookieStore.set(SOCIAL_LOGIN_ROLE_COOKIE, userType, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60,
    path: "/",
  });
  cookieStore.set(SOCIAL_AUTH_INTENT_COOKIE, intent, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60,
    path: "/",
  });
  if (deviceToken) {
    cookieStore.set(SOCIAL_DEVICE_TOKEN_COOKIE, deviceToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60,
      path: "/",
    });
  }

  await signIn(provider, { redirectTo: paths.socialLoginComplete() });
}
