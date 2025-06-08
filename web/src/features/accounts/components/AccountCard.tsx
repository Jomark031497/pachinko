import { Link } from "react-router";
import type { Account } from "~/features/accounts/accounts.schema";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { toCurrency } from "~/utils/toCurrency";

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => {
  const { user } = useAuth();

  return (
    <Link to={`/accounts/${account.id}`}>
      <div key={account.id} className="text-textPrimary bg-card-bg rounded p-2 shadow-md">
        <p className="text-sm font-bold">{account.name}</p>
        <p className="text-xs font-semibold capitalize">{account.type}</p>

        <p className="text-end text-xs">{account.type === "credit" ? "Oustanding Balance" : "Available Balance"}</p>
        <p className="text-end text-sm font-semibold">{toCurrency(account.balance, user?.currency)}</p>
      </div>
    </Link>
  );
};

export default AccountCard;
