import Pagination from "~/components/ui/Pagination";
import AccountCard from "~/features/accounts/components/AccountCard";
import useUserAccounts from "~/features/accounts/hooks/useUserAccounts";
import type { User } from "~/features/auth/auth.schema";
import usePagination from "~/hooks/usePagination";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface AccountsListProps {
  userId: User["id"];
}

const AccountCardSkeleton = () => {
  return (
    <div className="rounded bg-gray-200 bg-gradient-to-r p-2 text-white shadow">
      <div className="mb-1 h-4 w-1/2 animate-pulse rounded bg-gray-400/50" />
      <div className="mb-2 h-3 w-1/4 animate-pulse rounded bg-gray-400/30" />
      <div className="flex flex-col items-end gap-1">
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-400/30" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-400/40" />
      </div>
    </div>
  );
};

export default function AccountsList({ userId }: AccountsListProps) {
  const [listParent] = useAutoAnimate();

  const { limit, offset, nextPage, page, prevPage } = usePagination({
    initialLimit: 5,
    initialPage: 1,
  });

  const { data: accounts, isLoading } = useUserAccounts(userId, {
    limit,
    offset,
  });

  if (isLoading) {
    return (
      <>
        <div role="status" className="flex flex-col gap-2">
          <AccountCardSkeleton />
          <AccountCardSkeleton />
          <AccountCardSkeleton />
          <AccountCardSkeleton />
          <AccountCardSkeleton />
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
            <AccountCard account={item} />
          </li>
        ))}
      </ul>

      <Pagination nextPage={nextPage} page={page} prevPage={prevPage} totalPages={accounts.totalPages} />
    </>
  );
}
