import { useAuth } from "~/features/auth/hooks/useAuth";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <p>Hello {user?.username}</p>
    </>
  );
};
