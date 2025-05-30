import { useParams } from "react-router";
import { AccountCard } from "~/features/accounts/components/AccountCard";
import useAccountById from "~/features/accounts/hooks/useAccountById";
import TransactionsList from "~/features/transactions/components/TransactionsList";
import useTransactionsByAccountId from "~/features/transactions/hooks/useTransactionsByAccountId";

export default function Account() {
  const { id } = useParams();

  const { data: account } = useAccountById(id as string);

  const { data: transactions } = useTransactionsByAccountId(id as string);

  if (!account) return <p>Account not found!</p>;

  return (
    <>
      <AccountCard account={account} />

      <TransactionsList transactions={transactions} />
    </>
  );
}
