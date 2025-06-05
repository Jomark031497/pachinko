import type { Period } from "~/features/accounts/accounts.schema";
import useSummaryForUser from "~/features/accounts/hooks/useAccountSummaryForUser";
import type { User } from "~/features/auth/auth.schema";
import { toCurrency } from "~/utils/toCurrency";

interface UserSummaryProps {
  userId: User["id"];
  period?: Period;
}

const UserSummarySkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="grow animate-pulse rounded border-gray-300 bg-gray-200 p-4 text-center shadow-lg">
        <div className="mx-auto mb-1 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="mx-auto h-5 w-3/4 rounded bg-gray-300"></div>
      </div>
      <div className="grow animate-pulse rounded border-gray-300 bg-gray-200 p-4 text-center shadow-lg">
        <div className="mx-auto mb-1 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="mx-auto h-5 w-3/4 rounded bg-gray-300"></div>
      </div>
      <div className="grow animate-pulse rounded border-gray-300 bg-gray-200 p-4 text-center shadow-lg">
        <div className="mx-auto mb-1 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="mx-auto h-5 w-3/4 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

const UserSummary = ({ userId, period }: UserSummaryProps) => {
  const { data: userSummary, isLoading } = useSummaryForUser(userId, period);

  if (isLoading) return <UserSummarySkeleton />;

  if (!userSummary) return <p>unable to render userSummary</p>;

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="bg-accent-green/20 grow rounded border-gray-500 p-4 text-center shadow-lg">
        <p className="mb-1 text-xs font-semibold">Total Income</p>
        <p className="text-sm font-semibold">{toCurrency(userSummary.income)}</p>
      </div>
      <div className="bg-accent-red/20 grow rounded border-gray-500 p-4 text-center shadow-lg">
        <p className="mb-1 text-xs font-semibold">Total Expense</p>
        <p className="text-sm font-semibold">{toCurrency(userSummary.expense)}</p>
      </div>
      <div className="bg-accent-blue/20 grow rounded border-gray-500 p-4 text-center shadow-lg">
        <p className="mb-1 text-xs font-semibold">Cashflow</p>
        <p className="text-sm font-semibold">{toCurrency(userSummary.cashflow)}</p>
      </div>
    </div>
  );
};

export default UserSummary;
