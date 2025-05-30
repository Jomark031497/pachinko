import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, error, ...rest }, ref) => {
  return (
    <label className="text-sm font-semibold tracking-wide text-gray-500">
      {label}
      <select
        {...rest}
        ref={ref}
        className="border-primary/50 hover:border-primary/80 focus:border-primary mt-0.5 block w-full rounded border-2 px-1.5 py-1.5 transition-all outline-none"
      />
      {error && <p className="text-red-500">{error}</p>}
    </label>
  );
});
