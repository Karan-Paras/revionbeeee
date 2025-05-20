import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const formLabelVariants = cva("w-full", {
  variants: {
    variant: {
      default: "text-sm",
      light: "text-[#0B0B0B] font-light",
      bold: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof formLabelVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function FormLabel({
  children,
  className,
  variant,
  ...props
}: FormLabelProps) {
  return (
    <label {...props} className={cn(formLabelVariants({ variant }), className)}>
      {children}
    </label>
  );
}
