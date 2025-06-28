import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getUserAccounts } from "~/features/accounts/accounts.api";
import type { Account } from "~/features/accounts/accounts.schema";
import type { Pagination } from "~/utils/utils.types";

const useUserAccounts = (userId: Account["userId"], pagination?: Pagination) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.USER_ACCOUNTS, userId, pagination],
    queryFn: () => getUserAccounts(userId, pagination),
    placeholderData: (prev) => prev,
  });
};

export default useUserAccounts;
