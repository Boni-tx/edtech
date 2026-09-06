import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-navy-900 text-white hover:bg-navy-700 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100",
        outline:
          "border border-navy-900/15 bg-white text-navy-900 hover:bg-navy-50 dark:border-white/15 dark:bg-navy-900 dark:text-white dark:hover:bg-white/5",
        ghost:
          "text-navy-500 hover:bg-navy-50 hover:text-navy-900 dark:text-navy-300 dark:hover:bg-white/5 dark:hover:text-white",
        link: "text-navy-500 underline-offset-4 hover:text-navy-900 hover:underline dark:text-navy-300 dark:hover:text-white",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
