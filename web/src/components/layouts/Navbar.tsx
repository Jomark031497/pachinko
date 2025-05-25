import { useNavigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { useAuth } from "~/features/auth/hooks/useAuth";

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
    <header>
      <Button onClick={onLogout}>Logout</Button>
    </header>
  );
};
