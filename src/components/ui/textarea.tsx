import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { InputError } from "@/components/errors/input-error";

const textAreaLabelVariants = cva("w-full outline-0", {
  variants: {
    variant: {
      default: "p-5 border border-[#D8DAE5] rounded-xl",
      transparent: "min-h-40 border-b pt-2.5 px-4 border-b-[#dedfdd]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaLabelVariants> {
  className?: string;
  errors?: string[];
}

export function Textarea({
  className,
  errors,
  variant,
  ...props
}: TextareaProps) {
  return (
    <>
      <textarea
        {...props}
        className={cn(textAreaLabelVariants({ variant }), className)}
      />
      {!!errors && <InputError error={errors?.join(", ")} />}
    </>
  );
}
