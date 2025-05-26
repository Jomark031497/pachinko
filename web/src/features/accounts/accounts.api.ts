import { __API_URL__ } from "~/constants";
import type { Account } from "~/features/accounts/accounts.types";

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
