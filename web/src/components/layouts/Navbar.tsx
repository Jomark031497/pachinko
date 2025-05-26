import { Link, useNavigate } from "react-router";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { MdMenu } from "react-icons/md";

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
      <Link to="/">claremont</Link>
      <button onClick={onLogout} className="rounded-full p-2 transition-all hover:bg-gray-100">
        <MdMenu size={20} />
      </button>
    </header>
  );
};
