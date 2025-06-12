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
      <div key={account.id} className="text-textPrimary rounded bg-white p-2 shadow-md">
        <div className="flex items-center gap-2">
          <p className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-xl text-gray-500 shadow">
            {account.icon || account.name.charAt(0)}
          </p>
          <div>
            <p className="text-sm font-bold">{account.name}</p>
            <p className="text-xs font-semibold capitalize">{account.type}</p>
          </div>
        </div>

        <p className="text-end text-xs">{account.type === "credit" ? "Oustanding Balance" : "Available Balance"}</p>
        <p className="text-end text-sm font-semibold">{toCurrency(account.balance, user?.currency)}</p>
      </div>
    </Link>
  );
};

export default AccountCard;
