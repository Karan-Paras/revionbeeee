"use server";

import { auth } from "@/auth";
import { fetchServer } from "@/lib/fetch-server";

const LOGOUT_BACKEND_TIMEOUT_MS = 1500;

export type LogoutResult =
  | { success: true; userType: "teacher" | "user" }
  | { success: false; error: string };

export async function logout(): Promise<LogoutResult> {
  let isTeacher = false;

  try {
    const session = await auth();
    isTeacher = session?.user?.userType === "teacher";
  } catch {
    // Session may already be invalid; we still want to clear it below.
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      LOGOUT_BACKEND_TIMEOUT_MS
    );

    try {
      await fetchServer<null>(
        "/logout",
        "POST",
        undefined,
        undefined,
        undefined,
        controller.signal
      );
    } catch (error) {
      // The backend logout is best-effort. It only invalidates the remote
      // token/device session, so never let it block the local logout.
      const message = error instanceof Error ? error.message : "";
      if (
        message !== "This operation was aborted" &&
        message !== "The operation was aborted."
      ) {
        console.warn("Backend logout skipped:", message || error);
      }
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    // Abort or any unexpected error must not block the local sign-out.
  }

  return { success: true, userType: isTeacher ? "teacher" : "user" };
}
