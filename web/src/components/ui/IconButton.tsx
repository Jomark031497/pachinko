import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "~/utils/utils";

type IconButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ children, ...rest }, ref) => {
  return (
    <button
      {...rest}
      ref={ref}
      className={cn(rest.className, "cursor-pointer rounded-full p-1 transition-all hover:bg-gray-300")}
    >
      {children}
    </button>
  );
});

export default IconButton;
