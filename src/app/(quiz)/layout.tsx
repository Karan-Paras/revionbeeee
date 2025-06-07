"use client";

import { useRedirectIfProfileIncomplete } from "@/features/user/hooks/useRedirectIfProfileIncomplete";

interface QuizLayoutProps {
  children: React.ReactNode;
}

export default function QuizLayout({ children }: QuizLayoutProps) {
  useRedirectIfProfileIncomplete();

  return children;
}
