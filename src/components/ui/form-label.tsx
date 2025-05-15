import { cn } from "@/lib/utils";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children?: React.ReactNode;
}

export function FormLabel({ children, className, ...props }: FormLabelProps) {
  return (
    <label {...props} className={cn("w-full text-sm", className)}>
      {children}
    </label>
  );
}
