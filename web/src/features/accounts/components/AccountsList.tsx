import Pagination from "~/components/ui/Pagination";
import AccountCard, { AccountCardSkeleton } from "~/features/accounts/components/AccountCard";
import useUserAccounts from "~/features/accounts/hooks/useUserAccounts";
import usePagination from "~/hooks/usePagination";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { User } from "~/features/users/users.schema";

interface AccountsListProps {
  user: User;
}

export default function AccountsList({ user }: AccountsListProps) {
  const [listParent] = useAutoAnimate();

  const { limit, offset, nextPage, page, prevPage } = usePagination({
    initialLimit: 5,
    initialPage: 1,
  });

  const { data: accounts, isLoading } = useUserAccounts(user.id, {
    limit,
    offset,
  });

  if (isLoading) {
    return (
      <>
        <div role="status" className="flex flex-col gap-2">
          {Array.from({ length: limit }).map((_, i) => (
            <AccountCardSkeleton key={i} />
          ))}
        </div>
        <div className="h-[42px]" />
      </>
    );
  }

  if (!accounts?.data.length) {
    return (
      <div className="rounded-md bg-gray-50 p-8 text-center text-gray-500">
        <p>No accounts found.</p>
      </div>
    );
  }

  return (
    <>
      <ul ref={listParent} className="mb-4 flex flex-col gap-2">
        {accounts.data.map((item) => (
          <li key={item.id}>
            <AccountCard account={item} currency={user.currency} />
          </li>
        ))}
      </ul>

      <Pagination nextPage={nextPage} page={page} prevPage={prevPage} totalPages={accounts.totalPages} />
    </>
  );
}
