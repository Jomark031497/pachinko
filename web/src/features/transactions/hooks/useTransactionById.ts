import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getTransactionById } from "~/features/transactions/transactions.api";
import type { Transaction } from "~/features/transactions/transactions.schema";

const useTransactionById = (id: Transaction["id"]) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.TRANSACTION, id],
    queryFn: () => getTransactionById(id),
  });
};

export default useTransactionById;
