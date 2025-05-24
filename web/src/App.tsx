import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthContextProvider } from "~/contexts/auth";
import { ProtectedRoute } from "~/features/auth/components/ProtectedRoute";
import { Login } from "~/features/auth/routes/Login";
import { SignUp } from "~/features/auth/routes/SignUp";
import { Dashboard } from "~/features/dashboard/routes/Dashboard";

const router = createBrowserRouter([
  {
    element: <AuthContextProvider />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
