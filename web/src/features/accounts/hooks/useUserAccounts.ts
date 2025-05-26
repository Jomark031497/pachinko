import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getUserAccounts } from "~/features/accounts/accounts.api";
import type { Account } from "~/features/accounts/accounts.schema";

const useUserAccounts = (userId: Account["userId"]) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.USER_ACCOUNTS, userId],
    queryFn: () => getUserAccounts(userId),
  });
};

export default useUserAccounts;
