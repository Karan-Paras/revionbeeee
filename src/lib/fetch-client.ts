import type { ApiResponse, ApiSuccessResponse, Method } from "@/types/api";
import { getSession } from "next-auth/react";

export async function fetchClient<T>(
  url: string,
  method: Method,
  body?: object | FormData,
  next?: RequestInit["next"],
  headers?: RequestInit["headers"]
): Promise<ApiSuccessResponse<T>> {
  const api = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  const session = await getSession();
  const token = session?.user?.token;

  const isFormData = body instanceof FormData;

  try {
    const requestHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      ...(headers as Record<string, string>),
    };

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

    const json: ApiResponse<T> = await response.json();

    if (json.status != 200) {
      throw new Error(json.message);
    }

    return json as ApiSuccessResponse<T>;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred!";
    throw new Error(message);
  }
}
