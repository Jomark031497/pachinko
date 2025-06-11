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
    <label className="flex flex-col gap-1 text-sm font-semibold tracking-wide text-gray-500">
      {label}

      <ReactDatePicker
        {...rest}
        ref={ref}
        className="hover:border-primary focus:border-primary border-primary/50 mt-0.5 block w-full rounded border-2 px-1.5 py-1 transition-all outline-none"
        dateFormat="MMM dd yyyy h:mm aa"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
