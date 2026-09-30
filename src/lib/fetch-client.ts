import type { ApiResponse, ApiSuccessResponse, Method } from "@/types/api";
import { getSession } from "next-auth/react";

type FetchClientOptions = {
  auth?: boolean;
  next?: RequestInit["next"];
  headers?: RequestInit["headers"];
  signal?: AbortSignal;
};

const sessionTokenCacheMs = 30 * 1000;
const sessionTokenStorageKey = "revision-bee:session-token";
const sessionTokenUpdatedEvent = "revision-bee:session-token-updated";
let cachedSessionToken: { token: string; expiresAt: number } | null = null;
let sessionTokenPromise: Promise<string | undefined> | null = null;

function readStoredSessionToken() {
  if (typeof window === "undefined") return undefined;

  try {
    return window.sessionStorage.getItem(sessionTokenStorageKey) ?? undefined;
  } catch {
    return undefined;
  }
}

function writeStoredSessionToken(token?: string | null) {
  if (typeof window === "undefined") return;

  try {
    if (token) {
      window.sessionStorage.setItem(sessionTokenStorageKey, token);
    } else {
      window.sessionStorage.removeItem(sessionTokenStorageKey);
    }
    window.dispatchEvent(new Event(sessionTokenUpdatedEvent));
  } catch {
    /* ignore storage access errors */
  }
}

export function syncFetchClientSessionToken(token?: string | null) {
  cachedSessionToken = token
    ? { token, expiresAt: Date.now() + sessionTokenCacheMs }
    : null;
  writeStoredSessionToken(token);
}

export function getCachedFetchClientSessionToken() {
  if (cachedSessionToken && cachedSessionToken.expiresAt > Date.now()) {
    return cachedSessionToken.token;
  }

  const storedToken = readStoredSessionToken();
  if (storedToken) {
    cachedSessionToken = {
      token: storedToken,
      expiresAt: Date.now() + sessionTokenCacheMs,
    };
    return storedToken;
  }

  return undefined;
}

export function subscribeFetchClientSessionToken(listener: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(sessionTokenUpdatedEvent, listener);
  window.addEventListener("storage", listener);

  return () => {
    window.removeEventListener(sessionTokenUpdatedEvent, listener);
    window.removeEventListener("storage", listener);
  };
}

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

async function getSessionToken() {
  const cachedToken = getCachedFetchClientSessionToken();
  if (cachedToken) return cachedToken;

  sessionTokenPromise ??= getSession()
    .then((session) => {
      const token = session?.user?.token;
      syncFetchClientSessionToken(token);
      return token;
    })
    .finally(() => {
      sessionTokenPromise = null;
    });

  return sessionTokenPromise;
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
  const token = shouldAttachAuth ? await getSessionToken() : undefined;

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
