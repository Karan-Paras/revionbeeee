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
    <div className="mt-4 rounded border border-red-400 bg-red-200 p-2">
      {errors.join(", ")}
    </div>
  );
}
