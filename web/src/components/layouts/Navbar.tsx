import { Link, useNavigate } from "react-router";
import { useAuth } from "~/features/auth/hooks/useAuth";
import IconButton from "~/components/ui/IconButton";
import { RiMenu2Line } from "react-icons/ri";

export const Navbar = () => {
  const { handleLogout } = useAuth();

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
      <IconButton onClick={onLogout} className="text-primary">
        <RiMenu2Line size={25} />
      </IconButton>
    </header>
  );
};
