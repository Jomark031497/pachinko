import { useQuery } from "@tanstack/react-query";
import { getUserAccounts } from "~/features/accounts/accounts.api";
import type { Account } from "~/features/accounts/accounts.types";

export const useUserAccounts = (userId: Account["userId"]) => {
  return useQuery({
    queryKey: ["userAccounts", userId],
    queryFn: () => getUserAccounts(userId),
  });
};
