import { useEffect, type ReactNode } from "react";
import IconButton from "~/components/ui/IconButton";

interface MenuProps {
  children: ReactNode;
  icon: ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const Menu = ({ children, icon, ref, isOpen, toggle, close }: MenuProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close, ref]);

  return (
    <div className="relative" ref={ref}>
      <IconButton
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Toggle account menu"
        className="text-primary"
      >
        {icon}
      </IconButton>
      <div
        role="menu"
        aria-hidden={!isOpen}
        className={`absolute right-0 z-10 mt-2 w-40 origin-top-right transform rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-out ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} `}
      >
        {children}
      </div>
    </div>
  );
};

export default Menu;
