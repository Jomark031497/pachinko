import { Outlet } from "react-router";
import { Navbar } from "~/components/layouts/Navbar";

export const RootLayout = () => {
  return (
    <>
      <div className="bg-background mx-auto min-h-screen max-w-md p-4">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};
