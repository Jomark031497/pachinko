import { __API_URL__ } from "~/constants";
import type {
  CreateTransactionInput,
  Transaction,
  TransactionWithCategoryAndAccount,
  UpdateTransactionInput,
} from "~/features/transactions/transactions.schema";
import type { Pagination } from "~/utils/utils.types";

export const getTransactionById = async (id: Transaction["id"]): Promise<TransactionWithCategoryAndAccount> => {
  const url = new URL(`/api/transactions/${id}`, __API_URL__);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

export const getAllTransactionsByAccountId = async (
  accountId: Transaction["accountId"],
  pagination?: Pagination,
): Promise<{ data: TransactionWithCategoryAndAccount[]; totalPages: number; count: number }> => {
  const url = new URL(`/api/transactions/accounts/${accountId}`, __API_URL__);

  if (pagination?.limit) url.searchParams.set("limit", pagination.limit.toString());
  if (pagination?.offset) url.searchParams.set("offset", pagination.offset.toString());

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
  pagination?: Pagination,
): Promise<{ data: TransactionWithCategoryAndAccount[]; totalPages: number; count: number }> => {
  const url = new URL(`/api/transactions/users/${userId}`, __API_URL__);

  if (pagination?.limit) url.searchParams.set("limit", pagination.limit.toString());
  if (pagination?.offset) url.searchParams.set("offset", pagination.offset.toString());

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

export const createTransaction = async (payload: CreateTransactionInput): Promise<Transaction> => {
  const url = new URL("/api/transactions", __API_URL__);

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

export const updateTransaction = async (id: Transaction["id"], payload: UpdateTransactionInput) => {
  const url = new URL(`/api/transactions/${id}`, __API_URL__);

  const response = await fetch(url, {
    method: "PATCH",
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

export const deleteTransaction = async (id: Transaction["id"]) => {
  const url = new URL(`/api/transactions/${id}`, __API_URL__);

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
};
