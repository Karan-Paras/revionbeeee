"use client";

import { connectTeacherStripe } from "@/features/teacher/actions/connect-stripe";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

type ConnectStripeButtonProps = {
  children: ReactNode;
  className?: string;
  loadingText?: string;
};

export function ConnectStripeButton({
  children,
  className,
  loadingText = "Connecting...",
}: ConnectStripeButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  async function handleConnect() {
    if (isConnecting) return;

    setIsConnecting(true);
    const result = await connectTeacherStripe();

    if (!result.success) {
      toast.error(result.error);
      setIsConnecting(false);
      return;
    }

    window.location.assign(result.url);
  }

  return (
    <button
      type="button"
      onClick={handleConnect}
      disabled={isConnecting}
      className={className}
    >
      {isConnecting ? loadingText : children}
    </button>
  );
}
