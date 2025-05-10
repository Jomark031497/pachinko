import { eq, sql } from "drizzle-orm";
import { db } from "../../db/database.js";
import { NewTransaction, Transaction, transactions, UpdateTransaction } from "./transactions.schema.js";
import { AppError } from "../../utils/errors.js";
import { accounts } from "../accounts/accounts.schema.js";

export const createTransaction = async (payload: NewTransaction) => {
  const newTransaction = await db.transaction(async (tx) => {
    // create transaction
    const [newTransaction] = await tx.insert(transactions).values(payload).returning();

    // get account
    const [account] = await tx.select().from(accounts).where(eq(accounts.id, payload.accountId)).limit(1);
    if (!account) throw new AppError(404, "Account not found");

    const amount = Number(payload.amount);
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

export const getAllTransactionsByUserId = async (userId: Transaction["userId"]) => {
  return await db.select().from(transactions).where(eq(transactions.userId, userId));
};

export const getTransactionById = async (id: Transaction["id"]) => {
  const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1);
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
