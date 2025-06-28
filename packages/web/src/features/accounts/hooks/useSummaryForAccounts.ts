import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getSummaryForAccount } from "~/features/accounts/accounts.api";
import type { Account, Period } from "~/features/accounts/accounts.schema";

const useSummaryForAccount = (accountId: Account["id"], period?: Period) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.USER_SUMMARY, accountId, period],
    queryFn: () => getSummaryForAccount(accountId, period),
  });
};

export default useSummaryForAccount;
