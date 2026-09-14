"use server";

import { auth, signOut } from "@/auth";
import { fetchServer } from "@/lib/fetch-server";

const LOGOUT_BACKEND_TIMEOUT_MS = 5000;

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
      console.error("Backend logout failed", error);
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    // Abort or any unexpected error must not block the local sign-out.
  }

  try {
    await signOut({ redirect: false });
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again.",
    };
  }

  return { success: true, userType: isTeacher ? "teacher" : "user" };
}
