import { eq, sql } from "drizzle-orm";
import { db } from "../../db/database.js";
import { NewTransaction, Transaction, transactions, UpdateTransaction } from "./transactions.schema.js";
import { AppError } from "../../utils/errors.js";
import { accounts } from "../accounts/accounts.schema.js";

export const createTransaction = async (payload: NewTransaction) => {
  const newTransaction = await db.transaction(async (tx) => {
    const [account] = await tx.select().from(accounts).where(eq(accounts.id, payload.accountId)).limit(1);
    if (!account) throw new AppError(404, "Account not found");

    const amount = Number(payload.amount);

    // create transaction
    const [newTransaction] = await tx.insert(transactions).values(payload).returning();

    const currentBalance = Number(account.balance);

    const newBalance = payload.type === "income" ? currentBalance + amount : currentBalance - amount;

    // update account
    await tx
      .update(accounts)
      .set({ balance: newBalance.toFixed(2) })
      .where(eq(accounts.id, payload.accountId));

    return newTransaction;
  });

  return newTransaction;
};

export const getAllTransactionsByUserId = async (
  userId: Transaction["userId"],
  queryParams: Record<string, unknown>
) => {
  const limit = queryParams.limit ? Number(queryParams.limit) : 5; // default limit
  const offset = queryParams.offset ? Number(queryParams.offset) : 0; // default offset

  const transactionsQuery = await db.query.transactions.findMany({
    where: (transactions, { eq }) => eq(transactions.userId, userId),
    with: {
      category: true,
      account: true,
    },
    limit,
    offset,
    orderBy: (transactions, { desc }) => [desc(transactions.transactionDate), desc(transactions.createdAt)],
  });

  const countQuery = await db.$count(transactions, eq(transactions.userId, userId));
  const totalPages = limit > 0 ? Math.ceil(countQuery / limit) : 1;

  return {
    data: transactionsQuery,
    count: countQuery,
    totalPages,
  };
};

export const getAllTransactionsByAccountId = async (
  accountId: Transaction["accountId"],
  queryParams: Record<string, unknown>
) => {
  const limit = queryParams.limit ? Number(queryParams.limit) : 5; // default limit
  const offset = queryParams.offset ? Number(queryParams.offset) : 0; // default offset

  const transactionsQuery = await db.query.transactions.findMany({
    where: (transactions, { eq }) => eq(transactions.accountId, accountId),
    with: {
      category: true,
      account: true,
    },
    limit,
    offset,
    orderBy: (transactions, { desc }) => [desc(transactions.transactionDate), desc(transactions.createdAt)],
  });

  const countQuery = await db.$count(transactions, eq(transactions.accountId, accountId));
  const totalPages = limit > 0 ? Math.ceil(countQuery / limit) : 1;

  return {
    data: transactionsQuery,
    count: countQuery,
    totalPages,
  };
};

export const getTransactionById = async (id: Transaction["id"]) => {
  const transaction = await db.query.transactions.findFirst({
    where: (transactions, { eq }) => eq(transactions.id, id),
    with: {
      category: true,
      account: true,
    },
  });

  return transaction;
};

export const updateTransaction = async (id: Transaction["id"], payload: UpdateTransaction) => {
  const transaction = await getTransactionById(id);
  if (!transaction) throw new AppError(404, "Transaction not found");

  if (payload.amount || payload.type) {
    const oldAmount = transaction.amount;
    const newAmount = payload.amount ?? oldAmount;

    const oldType = transaction.type;
    const newType = payload.type ?? oldType;

    // reverse the old transaction

    const balanceAdjustmentAmount = oldType === "income" ? Number(-oldAmount) : Number(oldAmount);
    const newBalance = newType === "income" ? newAmount : -newAmount;

    const netChange = Number(balanceAdjustmentAmount) + Number(newBalance);

    const updatedTransaction = await db.transaction(async (tx) => {
      const [updated] = await tx.update(transactions).set(payload).where(eq(transactions.id, id)).returning();

      // update the accounts record
      await tx
        .update(accounts)
        .set({ balance: sql`${accounts.balance} + ${netChange}` })
        .where(eq(accounts.id, transaction.accountId));

      return updated;
    });
    return updatedTransaction;
  } else {
    const [updated] = await db.update(transactions).set(payload).where(eq(transactions.id, id)).returning();
    return updated;
  }
};

export const deleteTransaction = async (id: Transaction["id"]) => {
  const transaction = await getTransactionById(id);
  if (!transaction) throw new AppError(404, "transaction id not found");

  await db.transaction(async (tx) => {
    await tx.delete(transactions).where(eq(transactions.id, id));

    // revert the balance of the wallet

    const amountToRevert = transaction.type === "income" ? -transaction.amount : transaction.amount;

    await tx
      .update(accounts)
      .set({ balance: sql`${accounts.balance} + ${amountToRevert}` })
      .where(eq(accounts.id, transaction.accountId));
  });

  return { message: "transaction deleted successfully" };
};
