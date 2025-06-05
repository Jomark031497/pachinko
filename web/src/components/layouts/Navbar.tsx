import { Link, useNavigate } from "react-router";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { RiMenu2Line } from "react-icons/ri";
import { useRef } from "react";
import Menu from "~/components/ui/Menu";
import { useToggle } from "~/hooks/useToggle";
import { MdLogout } from "react-icons/md";

export const Navbar = () => {
  const { handleLogout } = useAuth();

  const { close, isOpen, toggle } = useToggle();
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
      <Link to="/" className="text-primary hover:text-primary/60 text-xl font-semibold tracking-widest transition-all">
        _pachinko.
      </Link>

      <Menu close={close} icon={<RiMenu2Line size={25} />} isOpen={isOpen} ref={menuRef} toggle={toggle}>
        <ul className="flex flex-col p-2">
          <li role="menuitem" tabIndex={0} className="w-full cursor-pointer">
            <button
              onClick={() => {
                close();
                onLogout();
              }}
              className="text-accent-red flex w-full cursor-pointer items-center gap-2 p-2 font-semibold transition-all hover:bg-gray-100"
            >
              <MdLogout />
              Logout
            </button>
          </li>
        </ul>
      </Menu>
    </header>
  );
};
