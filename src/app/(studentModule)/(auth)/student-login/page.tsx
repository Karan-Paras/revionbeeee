import { SharedLoginPage } from "@/features/auth/components/shared-login-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Login - Revision Bee",
  description:
    "Access your Revision Bee student account to track progress and take quizzes.",
};

type StudentLoginProps = {
  searchParams: Promise<{ socialError?: string }>;
};

export default async function StudentLogin({
  searchParams,
}: StudentLoginProps) {
  const { socialError } = await searchParams;
  return <SharedLoginPage socialError={socialError} />;
}
