import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      {...props}
      className={cn("size-5 accent-blue bg-transparent rounded-xl", className)}
      type="checkbox"
    />
  );
}
