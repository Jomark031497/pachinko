import { Outlet } from "react-router";
import { Navbar } from "~/components/layouts/Navbar";

export const RootLayout = () => {
  return (
    <>
      <div className="bg-background mx-auto min-h-screen max-w-md">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};
