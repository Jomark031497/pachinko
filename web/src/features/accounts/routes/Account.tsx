import { useParams } from "react-router";
import AccountCard from "~/features/accounts/components/AccountCard";
import useAccountById from "~/features/accounts/hooks/useAccountById";
import AccountTransactionsList from "~/features/transactions/components/AccountTransactionList";

export default function Account() {
  const { id } = useParams();

  const { data: account } = useAccountById(id as string);

  if (!account) return <p>Account not found!</p>;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="mb-4">
          <h1 className="font-semibold text-gray-500">Account</h1>
        </div>
        <AccountCard account={account} />
      </section>
      <AccountTransactionsList accountId={account.id} />
    </div>
  );
}
