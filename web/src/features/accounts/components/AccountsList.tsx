import Pagination from "~/components/ui/Pagination";
import { AccountCard } from "~/features/accounts/components/AccountCard";
import useUserAccounts from "~/features/accounts/hooks/useUserAccounts";
import type { User } from "~/features/auth/auth.schema";
import usePagination from "~/hooks/usePagination";

interface AccountsListProps {
  userId: User["id"];
}

export default function AccountsList({ userId }: AccountsListProps) {
  const { limit, offset, nextPage, page, prevPage } = usePagination({
    initialLimit: 5,
    initialPage: 1,
  });

  const { data: accounts } = useUserAccounts(userId, {
    limit,
    offset,
  });

  if (!accounts || accounts.data.length === 0) {
    return (
      <div className="rounded-md bg-gray-50 p-8 text-center text-gray-500">
        <p>No accounts found.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-2">
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
