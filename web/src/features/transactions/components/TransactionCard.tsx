import { Link } from "react-router";
import type { TransactionWithCategoryAndAccount } from "~/features/transactions/transactions.schema";
import { toCurrency } from "~/utils/toCurrency";
import { format } from "date-fns";
import { cn } from "~/utils/utils";
import type { User } from "~/features/users/users.schema";

interface Props {
  transaction: TransactionWithCategoryAndAccount;
  currency: User["currency"];
  asLink?: boolean;
}

const TransactionCard = ({ transaction, currency, asLink = true }: Props) => {
  const isIncome = transaction.type === "income";

  const content = (
    <div
      className={cn(
        isIncome ? "bg-accent-green/5" : "bg-accent-red/5",
        "grid grid-cols-3 rounded border border-dashed border-gray-300 p-2 text-gray-500 shadow",
      )}
    >
      <p className="col-span-2 text-xs font-semibold">{transaction.name}</p>
      <p className={cn(isIncome ? "text-accent-green" : "text-accent-red", "text-right text-xs font-semibold")}>
        {isIncome ? "" : "-"}
        {toCurrency(transaction.amount, currency)}
      </p>
      <p className="col-span-2 text-xs italic">{transaction.category.name}</p>
      <p className="text-right text-xs">{format(transaction.transactionDate, "MMM dd, yyyy")}</p>
      <p className="col-span-2 text-xs">{transaction.account.name}</p>
      <p className="text-right text-xs capitalize">{transaction.account.type}</p>
    </div>
  );

  return asLink ? <Link to={`/transactions/${transaction.id}`}>{content}</Link> : content;
};

export const TransactionCardSkeleton = () => {
  return (
    <div className="grid animate-pulse grid-cols-3 rounded border border-dashed border-gray-300 p-2 text-gray-500 shadow">
      <div className="col-span-2 h-4 w-3/4 rounded bg-gray-300" />
      <div className="h-4 w-1/3 justify-self-end rounded bg-gray-300" />

      <div className="col-span-2 mt-2 h-3 w-1/2 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-1/4 justify-self-end rounded bg-gray-200" />

      <div className="col-span-2 mt-2 h-3 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-1/3 justify-self-end rounded bg-gray-200" />
    </div>
  );
};

export default TransactionCard;
