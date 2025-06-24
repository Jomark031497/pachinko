import { Link } from "react-router";
import type { Account } from "~/features/accounts/accounts.schema";
import type { User } from "~/features/users/users.schema";
import { toCurrency } from "~/utils/toCurrency";

interface AccountCardProps {
  account: Account;
  currency: User["currency"];
  asLink?: boolean;
}

const AccountCard = ({ account, currency, asLink = true }: AccountCardProps) => {
  const content = (
    <div className="text-textPrimary rounded bg-white p-2 shadow-md">
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
      <p className="text-end text-sm font-semibold">{toCurrency(account.balance, currency)}</p>
    </div>
  );

  return asLink ? <Link to={`/accounts/${account.id}`}>{content}</Link> : content;
};

export const AccountCardSkeleton = () => {
  return (
    <div className="rounded bg-gray-200 bg-gradient-to-r p-2 text-white shadow">
      <div className="mb-1 h-4 w-1/2 animate-pulse rounded bg-gray-400/50" />
      <div className="mb-2 h-3 w-1/4 animate-pulse rounded bg-gray-400/30" />
      <div className="flex flex-col items-end gap-1">
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-400/30" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-400/40" />
      </div>
    </div>
  );
};
export default AccountCard;
