import TransactionsList from "./TransactionsList";
import useTransactionsByUserId from "~/features/transactions/hooks/useTransactionsByUserId";
import usePagination from "~/hooks/usePagination";
import Pagination from "~/components/ui/Pagination";
import type { User } from "~/features/users/users.schema";

interface Props {
  user: User;
}

const UserTransactionsList = ({ user }: Props) => {
  const { limit, offset, nextPage, page, prevPage } = usePagination({ initialLimit: 5, initialPage: 1 });
  const { data: transactions, isLoading } = useTransactionsByUserId(user.id, { limit, offset });

  if (isLoading) return <p className="text-sm text-gray-400">Loading transactions...</p>;

  if (!transactions || transactions.data.length === 0)
    return (
      <div className="rounded-md bg-gray-50 p-8 text-center text-gray-500">
        <p>No transactions found.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 rounded border border-gray-300 bg-white p-4 shadow">
      <Pagination nextPage={nextPage} page={page} prevPage={prevPage} totalPages={transactions.totalPages} />
      <TransactionsList transactions={transactions.data} currency={user.currency} />
    </div>
  );
};

export default UserTransactionsList;
