import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const buttonLabelVariants = cva(
  "bg-[#53A2EB] w-full rounded-md block text-center text-white p-4 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#53A2EB] duration-500 ease-in-out",
  {
    variants: {
      variant: {
        default: "",
        rounded: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonLabelVariants> {
  className?: string;
  children: React.ReactNode;
}

export function Button({
  className,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonLabelVariants({ variant }), className)}
    >
      {children}
    </button>
  );
}
