import { Outlet } from "react-router";
import { Navbar } from "~/components/layouts/Navbar";
import { Toaster } from "react-hot-toast";

export const RootLayout = () => {
  return (
    <>
      <div className="bg-background mx-auto min-h-screen max-w-md shadow">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      <Toaster position="bottom-center" />
    </>
  );
};
