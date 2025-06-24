import { cn } from "@/lib/utils";

interface InputErrorProps {
  error: string;
  className?: string;
}

export function InputError({ error, className }: InputErrorProps) {
  return <p className={cn("mt-1 text-sm text-red-600", className)}>{error}</p>;
}
