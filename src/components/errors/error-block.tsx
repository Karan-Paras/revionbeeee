import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ErrorBlockProps {
  errors?: string[];
  className?: string;
}

export function ErrorBlock({ errors, className }: ErrorBlockProps) {
  const [visible, setVisible] = useState<boolean>(!!errors?.length);

  useEffect(() => {
    if (errors && errors.length > 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  if (!visible || !errors || errors.length === 0) return null;

  return (
    <p role="alert" className={cn("mt-2 text-sm text-red-600", className)}>
      {errors.join(", ")}
    </p>
  );
}
