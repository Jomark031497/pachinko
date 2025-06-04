import { __API_URL__ } from "~/constants";
import type { Account, CreateAccountInput, UpdateAccountInput } from "~/features/accounts/accounts.schema";
import type { Pagination } from "~/utils/utils.types";

export const getUserAccounts = async (
  userId: Account["userId"],
  pagination?: Pagination,
): Promise<{ data: Account[]; count: number; totalPages: number }> => {
  const url = new URL(`/api/accounts/user/${userId}`, __API_URL__);

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

export const getAccountById = async (id: Account["id"]): Promise<Account> => {
  const url = new URL(`/api/accounts/${id}`, __API_URL__);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
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

export const updateAccount = async (accountId: Account["id"], payload: UpdateAccountInput): Promise<Account> => {
  const url = new URL(`/api/accounts/${accountId}`, __API_URL__);

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

export const deleteAccount = async (accountId: Account["id"]): Promise<{ message: string }> => {
  const url = new URL(`/api/accounts/${accountId}`, __API_URL__);

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};
