import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getAllTransactionsByAccountId } from "~/features/transactions/transactions.api";
import type { Transaction } from "~/features/transactions/transactions.schema";
import type { Pagination } from "~/utils/utils.types";

const useTransactionsByAccountId = (accountId: Transaction["accountId"], pagination?: Pagination) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.ACCOUNT_TRANSACTIONS, accountId, pagination],
    queryFn: () => getAllTransactionsByAccountId(accountId, pagination),
  });
};

export default useTransactionsByAccountId;
