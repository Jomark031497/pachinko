import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { __API_URL__ } from "~/constants";
import type { User, LoginCredentials } from "~/features/auth/auth.types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  handleLogin: (payload: LoginCredentials) => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (payload: LoginCredentials) => {
    try {
      const response = await fetch(new URL("/api/auth/login", __API_URL__), {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(new URL("/api/auth/user", __API_URL__), {
          credentials: "include",
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Auth check failed", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, handleLogin }}>
      {!isLoading && <Outlet />}
    </AuthContext.Provider>
  );
};
