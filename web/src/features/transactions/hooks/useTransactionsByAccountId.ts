import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getAllTransactionsByAccountId } from "~/features/transactions/transactions.api";
import type { Transaction } from "~/features/transactions/transactions.schema";

const useTransactionsByAccountId = (accountId: Transaction["accountId"]) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.ACCOUNT_TRANSACTIONS, accountId],
    queryFn: () => getAllTransactionsByAccountId(accountId),
  });
};

export default useTransactionsByAccountId;
