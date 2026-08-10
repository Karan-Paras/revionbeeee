"use server";

import { connectTeacherStripe as connectTeacherStripeApi } from "@/features/teacher/api/connect-stripe";

export type ConnectTeacherStripeResult =
  | { success: true; url: string }
  | { success: false; error: string };

function findStripeUrl(value: unknown): string | undefined {
  if (typeof value === "string") {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:"
        ? url.toString()
        : undefined;
    } catch {
      return undefined;
    }
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const urlKeys = [
    "url",
    "link",
    "onboardingUrl",
    "onboarding_url",
    "redirectUrl",
    "redirect_url",
  ];

  for (const key of urlKeys) {
    const url = findStripeUrl(record[key]);
    if (url) return url;
  }

  for (const nestedValue of Object.values(record)) {
    const url = findStripeUrl(nestedValue);
    if (url) return url;
  }

  return undefined;
}

export async function connectTeacherStripe(): Promise<ConnectTeacherStripeResult> {
  try {
    const response = await connectTeacherStripeApi();
    const url = findStripeUrl(response.data);

    if (!url) {
      return {
        success: false,
        error: "Stripe onboarding URL was not returned by the API.",
      };
    }

    return { success: true, url };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to connect Stripe. Please try again.",
    };
  }
}
