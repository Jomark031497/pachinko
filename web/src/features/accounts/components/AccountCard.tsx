import { Link } from "react-router";
import type { Account } from "~/features/accounts/accounts.schema";
import { toCurrency } from "~/utils/toCurrency";

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <Link to={`/accounts/${account.id}`}>
      <div key={account.id} className="text-textPrimary rounded bg-gradient-to-r from-white to-white p-2 shadow-md">
        <p className="text-sm font-bold">{account.name}</p>
        <p className="text-xs font-semibold capitalize">{account.type}</p>

        <p className="text-end text-xs">{account.type === "credit" ? "Oustanding Balance" : "Available Balance"}</p>
        <p className="text-end text-sm font-semibold">{toCurrency(account.balance)}</p>
      </div>
    </Link>
  );
};

export default AccountCard;
