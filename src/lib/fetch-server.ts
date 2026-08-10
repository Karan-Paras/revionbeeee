"use server";

import { auth } from "@/auth";
import type { ApiResponse, ApiSuccessResponse, Method } from "@/types/api";

export async function fetchServer<T>(
  url: string,
  method: Method,
  body?: object | FormData,
  next?: RequestInit["next"],
  headers?: RequestInit["headers"]
): Promise<ApiSuccessResponse<T>> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const isAbsoluteUrl = /^https?:\/\//i.test(url);

  if (!isAbsoluteUrl && !apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const apiPath = url;
  const api = isAbsoluteUrl ? url : `${apiBaseUrl}${apiPath}`;

  const session = await auth();
  const token = session?.user?.token;
  const isFormData = body instanceof FormData;

  try {
    const requestHeaders: Record<string, string> = {
      ...(headers as Record<string, string>),
    };

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    if (!isFormData && method !== "GET") {
      requestHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(api, {
      method,
      body:
        method === "POST"
          ? isFormData
            ? body
            : JSON.stringify(body)
          : undefined,
      headers: requestHeaders,
      ...(next ? { next } : {}),
    });

    const contentType = response.headers.get("content-type") ?? "";
    const responseBody = await response.text();

    if (!contentType.toLowerCase().includes("application/json")) {
      const reason =
        response.status === 404
          ? `API endpoint not found: ${apiPath}`
          : `API returned a non-JSON response (${response.status} ${response.statusText})`;

      throw new Error(
        `${reason}. Check NEXT_PUBLIC_API_URL and the backend route.`
      );
    }

    let json: ApiResponse<T>;

    try {
      json = JSON.parse(responseBody) as ApiResponse<T>;
    } catch {
      throw new Error(
        `API returned invalid JSON (${response.status} ${response.statusText}) for ${apiPath}.`
      );
    }

    if (!response.ok || json.status !== 200) {
      throw new Error(
        json.message || `Request failed with status ${response.status}.`
      );
    }

    return json as ApiSuccessResponse<T>;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred!";
    throw new Error(message);
  }
}
