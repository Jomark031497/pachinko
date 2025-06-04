import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "~/components/layouts/AuthLayout";
import { RootLayout } from "~/components/layouts/RootLayout";
import { AuthProvider } from "~/contexts/auth";
import Account from "~/features/accounts/routes/Account";
import { ProtectedRoute } from "~/features/auth/components/ProtectedRoute";
import { Login } from "~/features/auth/routes/Login";
import { SignUp } from "~/features/auth/routes/SignUp";
import { Dashboard } from "~/features/dashboard/routes/Dashboard";
import Transaction from "~/features/transactions/routes/Transaction";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "accounts",
                children: [
                  {
                    path: ":id",
                    element: <Account />,
                  },
                ],
              },
              {
                path: "transactions",
                children: [
                  {
                    path: ":id",
                    element: <Transaction />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
