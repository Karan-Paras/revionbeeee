"use client";

import { useRedirectIfProfileIncomplete } from "@/features/user/hooks/use-redirect-if-profile-incomplete";

interface QuizLayoutProps {
  children: React.ReactNode;
}

export default function QuizLayout({ children }: QuizLayoutProps) {
  useRedirectIfProfileIncomplete();

  return children;
}
