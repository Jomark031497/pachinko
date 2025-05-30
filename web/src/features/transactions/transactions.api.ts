import { __API_URL__ } from "~/constants";
import type { Transaction, TransactionWithCategoryAndAccount } from "~/features/transactions/transactions.schema";

export const getAllTransactionsByAccountId = async (
  accountId: Transaction["accountId"],
): Promise<TransactionWithCategoryAndAccount[]> => {
  const url = new URL(`/api/transactions/accounts/${accountId}`, __API_URL__);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

export const getAllTransactionsByUserId = async (
  userId: Transaction["userId"],
): Promise<TransactionWithCategoryAndAccount[]> => {
  const url = new URL(`/api/transactions/users/${userId}`, __API_URL__);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};
