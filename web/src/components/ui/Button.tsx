import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/utils/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => {
  return (
    <button
      {...rest}
      ref={ref}
      className={cn(
        rest.className,
        "bg-primary hover:bg-primary/80 cursor-pointer rounded px-6 py-1 font-semibold text-white transition-all",
      )}
    >
      {children}
    </button>
  );
});
