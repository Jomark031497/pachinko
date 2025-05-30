import TransactionsList from "./TransactionsList";
import useTransactionsByAccountId from "~/features/transactions/hooks/useTransactionsByAccountId";

interface Props {
  accountId: string;
}

const AccountTransactionsList = ({ accountId }: Props) => {
  const { data, isLoading } = useTransactionsByAccountId(accountId);

  if (isLoading) return <p className="text-sm text-gray-400">Loading account transactions...</p>;

  if (!data || data.length === 0) return <p className="text-gray-500">No transactions found for this account.</p>;

  return <TransactionsList transactions={data} />;
};

export default AccountTransactionsList;
