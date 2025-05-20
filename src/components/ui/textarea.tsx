import { cn } from "@/lib/utils";
import { InputError } from "@/components/ui/input-error";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  errors?: string[];
}

export function Textarea({ className, errors, ...props }: TextareaProps) {
  return (
    <>
      <textarea
        {...props}
        className={cn(
          "w-full p-5 border border-[#D8DAE5] outline-0 rounded-xl",
          className
        )}
      />
      {!!errors && <InputError error={errors?.join(", ")} />}
    </>
  );
}
