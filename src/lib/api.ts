"use server";

import { auth } from "@/auth";
// import { auth } from "@/auth";
import { API_URL } from "@/lib/constants";
import { ApiResponse, ApiSuccessResponse, Method } from "@/types/api";

export default async function api<T>(
  url: string,
  method: Method,
  body: object | FormData,
  next?: RequestInit["next"],
  headers?: RequestInit["headers"]
): Promise<ApiSuccessResponse<T>> {
  const api = `${API_URL}${url}`;

  const session = await auth();

  const token = session?.user?.token;

  const isFormData = body instanceof FormData;

  try {
    const response = await fetch(api, {
      method,
      body:
        method === "POST"
          ? isFormData
            ? body
            : JSON.stringify(body)
          : undefined,
      headers: {
        ...(isFormData
          ? { Authorization: `Bearer ${token}` }
          : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }),
        ...headers,
      },
      ...(next ? { next } : {}),
      cache: "no-cache",
    });

    const json: ApiResponse<T> = await response.json();
    console.log(url, body, json);

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
