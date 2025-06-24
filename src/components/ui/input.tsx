"use client";

import { useState } from "react";

import { InputError } from "@/components/errors/input-error";

import { Eye, EyeOff } from "@/lib/icons";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputLabelVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-white py-5 w-full outline-0 rounded-xl",
      bordered:
        "bg-white py-5 w-full outline-0 rounded-xl border border-[#D8DAE5]",
      transparent:
        "placeholder-[#22281E] w-full p-4 outline-0 border-[#DEDFDD] border-b",
    },
    hasIcon: {
      true: "ps-12 pe-5",
      false: "px-5",
    },
  },
  defaultVariants: {
    variant: "default",
    hasIcon: false,
  },
});

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputLabelVariants> {
  className?: string;
  iconClassName?: string;
  showPassword?: boolean;
  errors?: string[];
}

export function Input({
  className,
  iconClassName,
  errors,
  variant,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const hasIcon = !!iconClassName;

  const inputElement = (
    <input
      {...props}
      type={
        props.type === "password"
          ? showPassword
            ? "text"
            : "password"
          : props.type || "text"
      }
      className={cn(inputLabelVariants({ variant, hasIcon }), className)}
    />
  );

  return (
    <>
      {hasIcon ? (
        <div className={cn("icn_bg relative my-1.5", iconClassName)}>
          {inputElement}
          {props.type === "password" && (
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="pass_icon absolute top-0 right-5 bottom-0 h-full cursor-pointer content-center"
            >
              <span>{showPassword ? <Eye /> : <EyeOff />}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="relative">
          {inputElement}
          {props.type === "password" && (
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="pass_icon absolute top-0 right-5 bottom-0 cursor-pointer content-center"
            >
              <span>{showPassword ? <Eye /> : <EyeOff />}</span>
            </button>
          )}
        </div>
      )}
      {!!errors && <InputError error={errors?.join(", ")} />}
    </>
  );
}
