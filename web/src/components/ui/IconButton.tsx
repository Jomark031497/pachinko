import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "~/utils/utils";

type IconButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ children, ...rest }, ref) => {
  return (
    <button
      {...rest}
      ref={ref}
      className={cn(
        "cursor-pointer rounded-full p-1.5 transition-all hover:bg-gray-400 hover:text-white",
        rest.className,
      )}
    >
      {children}
    </button>
  );
});

export default IconButton;
