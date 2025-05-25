import { __API_URL__ } from "~/constants";
import type { User } from "~/features/auth/auth.types";
import type { LoginCredentials } from "~/features/auth/routes/Login";

export const getAuthenticatedUser = async (): Promise<User> => {
  const url = new URL("/api/auth/user", __API_URL__);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

export const loginUser = async (payload: LoginCredentials): Promise<User> => {
  const url = new URL("/api/auth/login", __API_URL__);

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

export const logoutUser = async () => {
  const url = new URL("/api/auth/logout", __API_URL__);

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};
