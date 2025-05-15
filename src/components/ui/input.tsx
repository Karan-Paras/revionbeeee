"use client";

import { Eye, EyeOff } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  iconClassName?: string;
  showPassword?: boolean;
  errors?: string[];
}

export function Input({ className, iconClassName, errors, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className={cn("relative my-1.5 icn_bg", iconClassName)}>
        <input
          {...props}
          type={
            props.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : props.type || "text"
          }
          className={cn(
            "bg-white py-5 ps-12 pe-5 w-full outline-0 rounded-xl",
            className
          )}
        />
        {props.type === "password" && (
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="pass_icon absolute right-5 top-0 bottom-0 h-full content-center cursor-pointer"
          >
            <span>{showPassword ? <Eye /> : <EyeOff />}</span>
          </button>
        )}
      </div>
      {!!errors && (
        <p className="text-red-600 mt-1 text-sm ">{errors?.join(", ")}</p>
      )}
    </>
  );
}
