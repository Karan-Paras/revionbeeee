import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      {...props}
      className={cn("accent-blue size-5 rounded-xl bg-transparent", className)}
      type="checkbox"
    />
  );
}
