import type { ApiResponse, ApiSuccessResponse, Method } from "@/types/api";
import { getSession } from "next-auth/react";

type FetchClientOptions = {
  auth?: boolean;
  next?: RequestInit["next"];
  headers?: RequestInit["headers"];
  signal?: AbortSignal;
};

function isFetchClientOptions(
  value: RequestInit["next"] | FetchClientOptions | undefined
): value is FetchClientOptions {
  return Boolean(
    value &&
      ("auth" in value ||
        "next" in value ||
        "headers" in value ||
        "signal" in value)
  );
}

export async function fetchClient<T>(
  url: string,
  method: Method,
  body?: object | FormData,
  next?: RequestInit["next"] | FetchClientOptions,
  headers?: RequestInit["headers"],
  signal?: AbortSignal
): Promise<ApiSuccessResponse<T>> {
  const options: FetchClientOptions = isFetchClientOptions(next)
    ? next
    : { next, headers, signal };
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const isAbsoluteUrl = /^https?:\/\//i.test(url);

  if (!isAbsoluteUrl && !apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const api = isAbsoluteUrl ? url : `${apiBaseUrl}${url}`;

  const shouldAttachAuth = options.auth !== false;
  const session = shouldAttachAuth ? await getSession() : null;
  const token = session?.user?.token;

  const isFormData = body instanceof FormData;

  try {
    const requestHeaders: Record<string, string> = {
      ...(options.headers as Record<string, string>),
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
      signal: options.signal,
      ...(options.next ? { next: options.next } : {}),
    });

    const contentType = response.headers.get("content-type") ?? "";
    const responseBody = await response.text();

    if (response.ok && !responseBody.trim()) {
      return {
        status: 200,
        message: "Request completed successfully.",
        data: null as T,
      };
    }

    if (!contentType.toLowerCase().includes("application/json")) {
      const reason =
        response.status === 404
          ? `API endpoint not found: ${url}`
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
        `API returned invalid JSON (${response.status} ${response.statusText}) for ${url}.`
      );
    }

    if (!response.ok || json.status >= 400) {
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
