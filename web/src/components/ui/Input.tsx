import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...rest }, ref) => {
  return (
    <label className="text-sm font-semibold tracking-wide text-gray-500">
      {label}
      <input
        {...rest}
        ref={ref}
        className="hover:border-primary-dark focus:border-primary mt-0.5 block w-full rounded border-2 px-1.5 py-1 transition-all outline-none"
      />
      {error && <p className="text-red-500">{error}</p>}
    </label>
  );
});
