import { useEffect, useState } from "react";

interface ErrorBlockProps {
  errors?: string[];
}

export function ErrorBlock({ errors }: ErrorBlockProps) {
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
    <div className="rounded mt-4 p-2 bg-red-200 border border-red-400">
      {errors.join(", ")}
    </div>
  );
}
