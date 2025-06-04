import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import type { DatePickerProps as ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = ReactDatePickerProps & {
  label: string;
  error?: string;
};

const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(({ label, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold tracking-wide text-gray-500">{label}</label>
      <ReactDatePicker
        {...rest}
        ref={ref}
        className="hover:border-primary-dark focus:border-primary mt-0.5 block w-full rounded border-2 px-1.5 py-1 transition-all outline-none"
        dateFormat="MMM dd yyyy"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
