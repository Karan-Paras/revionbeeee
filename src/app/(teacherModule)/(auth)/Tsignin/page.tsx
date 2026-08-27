import { SharedLoginPage } from "@/features/auth/components/shared-login-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Login - Revision Bee",
  description: "Sign in to your Revision Bee teacher account.",
};

type TeacherSignInProps = {
  searchParams: Promise<{ socialError?: string }>;
};

export default async function TeacherSignIn({
  searchParams,
}: TeacherSignInProps) {
  const { socialError } = await searchParams;
  return <SharedLoginPage userType="teacher" socialError={socialError} />;
}
