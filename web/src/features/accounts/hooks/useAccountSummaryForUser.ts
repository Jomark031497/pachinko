import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getSummaryForUser } from "~/features/accounts/accounts.api";

const useSummaryForUser = (userId: string) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.USER_SUMMARY, userId],
    queryFn: () => getSummaryForUser(userId),
  });
};

export default useSummaryForUser;
