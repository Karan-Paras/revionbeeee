import { Topic } from "@/features/subjects/types";
import type { ApiResponse, ApiSuccessResponse } from "@/types/api";

function findTopics(value: unknown): Topic[] {
  if (Array.isArray(value)) return value as Topic[];
  if (!value || typeof value !== "object") return [];

  const record = value as Record<string, unknown>;
  for (const key of ["topics", "data", "items", "results", "list"]) {
    const nested = record[key];
    if (Array.isArray(nested)) return nested as Topic[];
  }

  for (const nested of Object.values(record)) {
    const topics = findTopics(nested);
    if (topics.length) return topics;
  }

  return [];
}

export async function getSubjectsOnServer(): Promise<
  ApiSuccessResponse<Topic[]>
> {
  const apiUrl = "/topic/list";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(`${apiBaseUrl}${apiUrl}`, {
    method: "GET",
    next: { revalidate: 5 * 60 },
  });

  const json = (await response.json()) as ApiResponse<Topic[]>;

  if (!response.ok || json.status >= 400) {
    throw new Error(
      json.message || `Request failed with status ${response.status}.`
    );
  }

  const success = json as ApiSuccessResponse<Topic[]>;

  return {
    ...success,
    data: findTopics(success.data),
  };
}
