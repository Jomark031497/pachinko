import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => {
  return (
    <button
      {...rest}
      ref={ref}
      className={cn(
        "bg-primary hover:bg-primary/80 cursor-pointer rounded px-8 py-1.5 font-semibold text-white transition-all",
        rest.className,
      )}
    >
      {children}
    </button>
  );
});
