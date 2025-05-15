import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-[#53A2EB] w-full rounded-md block text-center text-white p-4 font-medium cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
