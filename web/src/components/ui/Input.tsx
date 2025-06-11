import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "~/utils/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, containerClassName, ...rest }, ref) => {
  return (
    <label className={cn("text-sm font-semibold tracking-wide text-gray-500", containerClassName)}>
      {label}
      <input
        {...rest}
        ref={ref}
        className="hover:border-primary focus:border-primary mt-0.5 block w-full rounded border-2 px-1.5 py-1 transition-all outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  );
});
