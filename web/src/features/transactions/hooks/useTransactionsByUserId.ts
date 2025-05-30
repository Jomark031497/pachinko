import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getAllTransactionsByUserId } from "~/features/transactions/transactions.api";
import type { Transaction } from "~/features/transactions/transactions.schema";

const useTransactionsByUserId = (userId: Transaction["userId"]) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.USER_TRANSACTIONS, userId],
    queryFn: () => getAllTransactionsByUserId(userId),
  });
};

export default useTransactionsByUserId;
