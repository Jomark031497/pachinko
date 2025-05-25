/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getAuthenticatedUser, loginUser, logoutUser } from "~/features/auth/auth.api";
import type { User } from "~/features/auth/auth.types";
import type { LoginCredentials } from "~/features/auth/routes/Login";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  handleLogin: (payload: LoginCredentials) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async (payload: LoginCredentials) => {
    try {
      const userData = await loginUser(payload);
      setUser(userData);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Login Failed");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Logout Failed");
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await getAuthenticatedUser();
        setUser(userData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, handleLogin, handleLogout }}>
      {!isLoading && <Outlet />}
    </AuthContext.Provider>
  );
};
