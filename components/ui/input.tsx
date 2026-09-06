import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-lg border border-navy-900/15 bg-white px-3.5 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-300 focus-visible:border-navy-900/30 focus-visible:ring-2 focus-visible:ring-navy-900/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-navy-800 dark:text-white dark:placeholder:text-navy-500 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/15",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
