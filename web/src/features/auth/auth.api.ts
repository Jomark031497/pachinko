import { __API_URL__ } from "~/constants";
import type { LoginInputs, SignUpInputs } from "~/features/auth/auth.schema";
import type { User } from "~/features/users/users.schema";
import { ApiError } from "~/utils/errors";

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

export const loginUser = async (payload: LoginInputs): Promise<User> => {
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

export const signUpUser = async (payload: SignUpInputs): Promise<User> => {
  const url = new URL("/api/auth/sign-up", __API_URL__);

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) throw new ApiError(data.message, response.status, data.errors);

  return data;
};
