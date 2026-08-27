import type { User } from "@/features/user/types";
import type { ApiSuccessResponse } from "@/types/api";

type SocialAuthData = {
  provider: "google" | "outlook";
  providerId: string;
  email: string;
  name: string;
  avatar: string;
  deviceToken: string;
  userType: "student" | "teacher";
};

type JsonRecord = Record<string, unknown>;
const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null;
const getString = (record: JsonRecord, ...keys: string[]) => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }
};

export async function socialAuth(
  data: SocialAuthData
): Promise<ApiSuccessResponse<User>> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBaseUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured.");

  const formData = new FormData();
  formData.set("provider", data.provider);
  formData.set("provider_id", data.providerId);
  formData.set("email", data.email);
  formData.set("name", data.name);
  formData.set("avatar", data.avatar);
  formData.set("userType", data.userType);
  formData.set("deviceType", "web");
  formData.set("deviceToken", data.deviceToken);

  const response = await fetch(
    `${apiBaseUrl.replace(/\/+$/, "")}/social-auth`,
    { method: "POST", body: formData, cache: "no-store" }
  );
  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error("The social registration API returned invalid JSON.");
  }
  if (!isRecord(json)) throw new Error("Invalid social registration response.");

  const status =
    typeof json.status === "number" ? json.status : response.status;
  const message =
    typeof json.message === "string"
      ? json.message
      : "Social registration failed.";
  if (!response.ok || status >= 400) throw new Error(message);

  const dataRecord = isRecord(json.data) ? json.data : undefined;
  const nestedData =
    dataRecord && isRecord(dataRecord.data) ? dataRecord.data : undefined;
  const userRecord =
    (dataRecord && isRecord(dataRecord.user) ? dataRecord.user : undefined) ??
    (isRecord(json.user) ? json.user : undefined) ??
    nestedData ??
    dataRecord;
  const token =
    getString(json, "token", "accessToken", "access_token") ??
    (dataRecord
      ? getString(dataRecord, "token", "accessToken", "access_token")
      : undefined) ??
    (nestedData
      ? getString(nestedData, "token", "accessToken", "access_token")
      : undefined);

  if (!userRecord || !token) {
    throw new Error(
      "Social registration response is missing user data or token."
    );
  }

  return { status: 200, message, data: userRecord as unknown as User, token };
}
