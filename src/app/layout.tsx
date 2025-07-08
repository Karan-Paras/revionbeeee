import Providers from "@/app/providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Color_Emoji, Sora } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "sonner";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const notoEmoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: "400",
  display: "swap",
  variable: "--font-noto-emoji",
});

export const metadata: Metadata = {
  title: "Revision Bee",
  description:
    "Revise smarter with personalized quizzes, subject insights, and progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={cn(sora.className, notoEmoji.variable)}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
