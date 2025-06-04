import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/utils/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "contained" | "outlined" | "error";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "contained", ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={cn(
          variant === "contained"
            ? "bg-primary border-primary hover:bg-primary/80 text-white"
            : variant === "outlined"
              ? "border-primary text-primary bg-primary/10 hover:text-primary-light hover:border-primary-light"
              : "bg-accent-red border-accent-red hover:bg-accent-red/80 text-white",
          "cursor-pointer rounded border-2 px-2 py-0.5 font-semibold transition-all",
          rest.className,
        )}
      >
        {children}
      </button>
    );
  },
);
