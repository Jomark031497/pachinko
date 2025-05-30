import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <main className="flex h-screen items-center justify-center border p-4">
        <Outlet />
      </main>

      <Toaster position="bottom-center" />
    </>
  );
};

export default AuthLayout;
