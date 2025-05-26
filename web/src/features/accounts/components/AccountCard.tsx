import { Link } from "react-router";
import type { Account } from "~/features/accounts/accounts.schema";
import { toCurrency } from "~/utils/toCurrency";

interface AccountCardProps {
  account: Account;
}

export const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <div key={account.id} className="rounded border border-gray-200 bg-white p-2 shadow">
      <div>
        <p className="text-sm font-semibold">{account.name}</p>
        <p className="text-sm text-gray-500 capitalize">{account.type}</p>
      </div>
      <div>
        <Link to={`/accounts/${account.id}`}>{">"}</Link>
      </div>
      <p className="text-end font-semibold">{toCurrency(account.balance)}</p>
    </div>
  );
};
