import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getAllTransactionsByUserId } from "~/features/transactions/transactions.api";
import type { Transaction } from "~/features/transactions/transactions.schema";
import type { Pagination } from "~/utils/utils.types";

const useTransactionsByUserId = (userId: Transaction["userId"], pagination?: Pagination) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.USER_TRANSACTIONS, userId, pagination],
    queryFn: () => getAllTransactionsByUserId(userId, pagination),
    placeholderData: (prev) => prev,
  });
};

export default useTransactionsByUserId;
