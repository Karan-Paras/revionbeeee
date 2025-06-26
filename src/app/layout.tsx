import Providers from "@/app/providers";
import { RootModals } from "@/components/root-modals";
import { SubscriptionAlert } from "@/features/subscriptions/components/subscription-alert";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "sonner";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revision Bee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={sora.className}>
        <Providers>
          <Toaster />
          <RootModals />
          <SubscriptionAlert />
          {children}
        </Providers>
      </body>
    </html>
  );
}
