import { SharedLoginPage } from "@/features/auth/components/shared-login-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Revision Bee",
  description:
    "Access your Revision Bee account to track progress and take quizzes.",
};

type LoginProps = {
  searchParams: Promise<{ socialError?: string }>;
};

export default async function Login({ searchParams }: LoginProps) {
  const { socialError } = await searchParams;
  return <SharedLoginPage socialError={socialError} />;
}
