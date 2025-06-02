import { Link } from "react-router";
import type { Account } from "~/features/accounts/accounts.schema";
import { toCurrency } from "~/utils/toCurrency";

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <Link to={`/accounts/${account.id}`}>
      <div key={account.id} className="to-card/90 from-card rounded bg-gradient-to-r p-2 shadow">
        <p className="text-sm font-bold">{account.name}</p>
        <p className="text-xs font-semibold text-gray-100 capitalize">{account.type}</p>

        <p className="text-end text-xs">{account.type === "credit" ? "Oustanding Balance" : "Available Balance"}</p>
        <p className="text-end text-sm font-semibold">{toCurrency(account.balance)}</p>
      </div>
    </Link>
  );
};

export default AccountCard;
