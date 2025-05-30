import { eq } from "drizzle-orm";
import { db } from "../../db/database.js";
import { Account, accounts, NewAccount, UpdateAccount } from "./accounts.schema.js";
import { AppError } from "../../utils/errors.js";
import { transactions } from "../transactions/transactions.schema.js";
import { categories } from "../categories/categories.schema.js";

export const getAccountById = async (id: Account["id"]) => {
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);

  if (!account) throw new AppError(404, "account not found");

  return account;
};

export const getAllAccountsByUserId = async (userId: Account["userId"]) => {
  const query = await db.select().from(accounts).where(eq(accounts.userId, userId));

  return query;
};

export const createAccount = async (payload: NewAccount) => {
  const newAccount = await db.transaction(async (tx) => {
    const [newAccount] = await tx.insert(accounts).values(payload).returning();
    if (!newAccount) throw new AppError(400, "create account failed");

    const [category] = await tx.select().from(categories).where(eq(categories.name, "Other"));
    if (!category) throw new AppError(400, "create account failed. category not found");

    await tx.insert(transactions).values({
      accountId: newAccount.id,
      amount: newAccount.balance,
      userId: newAccount.userId,
      name: "Initial Balance",
      type: "income",
      categoryId: category.id,
    });

    return newAccount;
  });

  return newAccount;
};

export const updateAccount = async (id: Account["id"], payload: UpdateAccount) => {
  const account = await getAccountById(id);

  if (!account) throw new AppError(404, "account id not found");

  const [updatedAccount] = await db.update(accounts).set(payload).where(eq(accounts.id, id)).returning();

  return updatedAccount;
};

export const deleteAccount = async (id: Account["id"]) => {
  const account = await getAccountById(id);
  if (!account) throw new AppError(404, "account id not found");

  await db.delete(accounts).where(eq(accounts.id, id));

  return { message: "account deleted" };
};
