import { cn } from "@/lib/utils";

interface InputErrorProps {
  error: string;
  className?: string;
}

export function InputError({ error, className }: InputErrorProps) {
  return <p className={cn("text-red-600 mt-1 text-sm", className)}>{error}</p>;
}
