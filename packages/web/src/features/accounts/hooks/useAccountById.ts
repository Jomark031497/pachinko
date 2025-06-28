import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getAccountById } from "~/features/accounts/accounts.api";
import type { Account } from "~/features/accounts/accounts.schema";

const useAccountById = (id: Account["id"]) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.ACCOUNT, id],
    queryFn: () => getAccountById(id),
  });
};

export default useAccountById;
