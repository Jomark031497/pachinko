/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getAuthenticatedUser, loginUser, logoutUser, signUpUser } from "~/features/auth/auth.api";
import type { LoginInputs, SignUpInputs } from "~/features/auth/auth.schema";
import type { User } from "~/features/users/users.schema";
import { ApiError } from "~/utils/errors";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
  handleLogin: (payload: LoginInputs) => Promise<void>;
  handleSignUp: (payload: SignUpInputs) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async (payload: LoginInputs) => {
    try {
      const userData = await loginUser(payload);
      setUser(userData);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Login Failed");
    }
  };

  const handleSignUp = async (payload: SignUpInputs) => {
    try {
      const userData = await signUpUser(payload);
      setUser(userData);
    } catch (error) {
      if (error instanceof ApiError) throw new ApiError(error.message, error.statusCode, error.details);
      throw new Error("Sign Up Failed");
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
    <AuthContext.Provider value={{ user, isLoading, handleLogin, handleSignUp, handleLogout, setUser }}>
      {!isLoading && <Outlet />}
    </AuthContext.Provider>
  );
};
