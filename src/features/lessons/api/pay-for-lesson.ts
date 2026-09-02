import { fetchClient } from "@/lib/fetch-client";

const payForLessonUrl =
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/pay";

type ApiRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function findCheckoutUrl(value: unknown): string | undefined {
  if (typeof value === "string" && /^https?:\/\//i.test(value)) return value;

  if (Array.isArray(value)) {
    for (const item of value) {
      const url = findCheckoutUrl(item);
      if (url) return url;
    }
    return undefined;
  }

  if (!isRecord(value)) return undefined;

  for (const key of [
    "checkoutUrl",
    "checkout_url",
    "paymentUrl",
    "payment_url",
    "url",
  ]) {
    const candidate = value[key];
    if (typeof candidate === "string" && /^https?:\/\//i.test(candidate)) {
      return candidate;
    }
  }

  for (const nested of Object.values(value)) {
    const url = findCheckoutUrl(nested);
    if (url) return url;
  }
  return undefined;
}

export async function payForLesson(lessonID: string | number) {
  const response = await fetchClient<unknown>(payForLessonUrl, "POST", {
    lessonID,
  });
  const checkoutUrl = findCheckoutUrl(response);

  if (!checkoutUrl) {
    throw new Error(
      response.message || "Payment page URL was not returned. Please try again."
    );
  }

  return {
    checkoutUrl,
  };
}
