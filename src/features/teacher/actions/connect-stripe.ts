"use server";

import {
  connectTeacherStripe as connectTeacherStripeApi,
  getTeacherStripeOnboardingStatus as getTeacherStripeOnboardingStatusApi,
} from "@/features/teacher/api/connect-stripe";

export type ConnectTeacherStripeResult =
  | { success: true; url: string }
  | { success: false; error: string };

export type GetTeacherStripeOnboardingStatusResult =
  | { success: true; configured: boolean; message?: string }
  | { success: false; error: string };

const stripeStatusKeys = [
  "configured",
  "isConfigured",
  "is_configured",
  "stripeConfigured",
  "stripe_configured",
  "stripeConnected",
  "stripe_connected",
  "onboardingStatus",
  "onboarding_status",
  "onboardingComplete",
  "onboarding_complete",
  "status",
];

function parseStripeStatus(value: string): boolean | undefined {
  const normalized = value.trim().toLowerCase();

  if (["false", "no", "failed", "incomplete", "pending"].includes(normalized)) {
    return false;
  }

  if (["true", "yes", "complete", "completed", "active"].includes(normalized)) {
    return true;
  }

  return undefined;
}

function findStripeStatus(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") return parseStripeStatus(value);

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;

  for (const key of stripeStatusKeys) {
    if (!(key in record)) continue;

    const status = findStripeStatus(record[key]);
    if (typeof status === "boolean") return status;
  }

  for (const nestedValue of Object.values(record)) {
    const status = findStripeStatus(nestedValue);
    if (typeof status === "boolean") return status;
  }

  return undefined;
}

function findResponseMessage(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value.trim() || undefined;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;

  for (const key of [
    "detail",
    "details",
    "description",
    "message",
    "errorMessage",
    "error_message",
  ]) {
    if (typeof record[key] === "string" && record[key].trim()) {
      return record[key].trim();
    }
  }

  for (const nestedValue of Object.values(record)) {
    const message = findResponseMessage(nestedValue);
    if (message) return message;
  }

  return undefined;
}

const payoutSetupRequiredTitle = "Payout setup required";
const payoutSetupRequiredDescription =
  "Your payout account setup is incomplete. Complete Stripe onboarding to start receiving lesson payments.";
const payoutSetupRequiredMessage = `${payoutSetupRequiredTitle}\n${payoutSetupRequiredDescription}`;

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

export async function getTeacherStripeOnboardingStatus(): Promise<GetTeacherStripeOnboardingStatusResult> {
  try {
    const response = await getTeacherStripeOnboardingStatusApi();
    const configured = findStripeStatus(response.data);

    if (typeof configured !== "boolean") {
      return {
        success: false,
        error: "Stripe configuration status was not returned by the API.",
      };
    }

    const responseMessage =
      response.message === "Request completed successfully."
        ? undefined
        : response.message;
    const dataMessage = findResponseMessage(response.data);
    const message =
      dataMessage === payoutSetupRequiredTitle
        ? payoutSetupRequiredMessage
        : responseMessage === payoutSetupRequiredTitle && !dataMessage
          ? payoutSetupRequiredMessage
          : responseMessage && dataMessage && responseMessage !== dataMessage
            ? `${responseMessage}\n${dataMessage}`
            : (dataMessage ?? responseMessage ?? payoutSetupRequiredMessage);

    return {
      success: true,
      configured,
      message,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to check Stripe configuration.",
    };
  }
}
