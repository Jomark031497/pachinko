import { and, between, eq, sum } from "drizzle-orm";
import { db } from "../../db/database.js";
import { Account, accounts, NewAccount, UpdateAccount } from "./accounts.schema.js";
import { AppError } from "../../utils/errors.js";
import { transactions } from "../transactions/transactions.schema.js";
import { categories } from "../categories/categories.schema.js";
import { getPeriodRange, Period } from "../../utils/periodRange.js";

export const getAccountById = async (id: Account["id"]) => {
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);

  if (!account) throw new AppError(404, "account not found");

  return account;
};

export const getAllAccountsByUserId = async (userId: Account["userId"], queryParams: Record<string, unknown>) => {
  const limit = queryParams.limit ? Number(queryParams.limit) : undefined; // default limit
  const offset = queryParams.offset ? Number(queryParams.offset) : undefined; // default offset

  const accountsQuery = await db.query.accounts.findMany({
    where: (accounts, { eq }) => eq(accounts.userId, userId),
    ...(limit !== undefined && { limit }),
    ...(offset !== undefined && { offset }),
    orderBy: (accounts, { asc }) => [asc(accounts.name)],
  });

  const countQuery = await db.$count(accounts, eq(accounts.userId, userId));
  const totalPages = !limit ? 0 : limit > 0 ? Math.ceil(countQuery / limit) : 1;

  return {
    data: accountsQuery,
    count: countQuery,
    totalPages,
  };
};

export const getSummaryForUser = async (userId: Account["userId"], period: Period) => {
  const { start, end } = getPeriodRange(period);

  const [incomeRes, expenseRes] = await Promise.all([
    db
      .select({ total: sum(transactions.amount) })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          eq(transactions.type, "income"),
          between(transactions.transaction_date, start.toISOString(), end.toISOString())
        )
      ),

    db
      .select({ total: sum(transactions.amount) })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          eq(transactions.type, "expense"),
          between(transactions.transaction_date, start.toISOString(), end.toISOString())
        )
      ),
  ]);

  const income = incomeRes[0]?.total ?? "0";
  const expense = expenseRes[0]?.total ?? "0";
  const cashflow = parseFloat(income) - parseFloat(expense);

  return {
    income: incomeRes[0]?.total ?? 0,
    expense: expenseRes[0]?.total ?? 0,
    cashflow: cashflow.toFixed(2),
  };
};

export const getSummaryForAccount = async (accountId: Account["id"], period: Period) => {
  const { start, end } = getPeriodRange(period);

  const [incomeRes, expenseRes] = await Promise.all([
    db
      .select({ total: sum(transactions.amount) })
      .from(transactions)
      .where(
        and(
          eq(transactions.accountId, accountId),
          eq(transactions.type, "income"),
          between(transactions.transaction_date, start.toISOString(), end.toISOString())
        )
      ),

    db
      .select({ total: sum(transactions.amount) })
      .from(transactions)
      .where(
        and(
          eq(transactions.accountId, accountId),
          eq(transactions.type, "expense"),
          between(transactions.transaction_date, start.toISOString(), end.toISOString())
        )
      ),
  ]);

  const income = incomeRes[0]?.total ?? "0";
  const expense = expenseRes[0]?.total ?? "0";
  const cashflow = parseFloat(income) - parseFloat(expense);

  return {
    income: incomeRes[0]?.total ?? 0,
    expense: expenseRes[0]?.total ?? 0,
    cashflow: cashflow.toFixed(2),
  };
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
