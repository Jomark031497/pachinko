import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getSummaryForUser } from "~/features/accounts/accounts.api";
import type { Period } from "~/features/accounts/accounts.schema";

const useSummaryForUser = (userId: string, period?: Period) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.USER_SUMMARY, userId, period],
    queryFn: () => getSummaryForUser(userId, period),
  });
};

export default useSummaryForUser;
