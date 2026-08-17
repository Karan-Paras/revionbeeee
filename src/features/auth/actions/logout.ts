"use server";

import { auth, signOut } from "@/auth";
import { fetchServer } from "@/lib/fetch-server";

export type LogoutResult =
  | { success: true; userType: "teacher" | "user" }
  | { success: false; error: string };

export async function logout(): Promise<LogoutResult> {
  try {
    const session = await auth();
    const isTeacher = session?.user?.userType === "teacher";

    await fetchServer<null>("/logout", "POST");

    await signOut({ redirect: false });

    return { success: true, userType: isTeacher ? "teacher" : "user" };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again.",
    };
  }
}
