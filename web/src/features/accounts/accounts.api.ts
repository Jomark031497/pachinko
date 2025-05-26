import { __API_URL__ } from "~/constants";
import type { Account, CreateAccountInput } from "~/features/accounts/accounts.schema";

export const getUserAccounts = async (userId: Account["userId"]): Promise<Account[]> => {
  const url = new URL(`/api/accounts/user/${userId}`, __API_URL__);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

export const createAccount = async (payload: CreateAccountInput): Promise<Account> => {
  const url = new URL(`/api/accounts/`, __API_URL__);

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
