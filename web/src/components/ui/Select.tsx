import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "~/utils/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, containerClassName, ...rest }, ref) => {
    return (
      <label className={cn("text-sm font-semibold tracking-wide text-gray-500", containerClassName)}>
        {label}
        <select
          {...rest}
          ref={ref}
          className="hover:border-primary focus:border-primary mt-0.5 block w-full rounded border-2 bg-white px-1.5 py-1.5 transition-all outline-none"
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </label>
    );
  },
);
