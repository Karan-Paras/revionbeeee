import { fetchServer } from "@/lib/fetch-server";

export type StripeConnectResponse =
  | string
  | {
      url?: string;
      link?: string;
      onboardingUrl?: string;
      onboarding_url?: string;
      redirectUrl?: string;
      redirect_url?: string;
      [key: string]: unknown;
    };

export async function connectTeacherStripe() {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/stripe/connect`;
  return fetchServer<StripeConnectResponse>(apiUrl, "POST");
}
