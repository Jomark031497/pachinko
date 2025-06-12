import { Link } from "react-router";
import type { TransactionWithCategoryAndAccount } from "~/features/transactions/transactions.schema";
import { toCurrency } from "~/utils/toCurrency";
import { format } from "date-fns";
import { cn } from "~/utils/utils";
import { useAuth } from "~/features/auth/hooks/useAuth";

interface Props {
  transaction: TransactionWithCategoryAndAccount;
}

const TransactionCard = ({ transaction }: Props) => {
  const { user } = useAuth();

  const isIncome = transaction.type === "income";

  return (
    <Link to={`/transactions/${transaction.id}`}>
      <div
        className={cn(
          isIncome ? "bg-accent-green/5" : "bg-accent-red/5",
          "grid grid-cols-3 rounded border border-dashed border-gray-300 p-2 text-gray-500 shadow",
        )}
      >
        <p className="col-span-2 text-xs font-semibold">{transaction.name}</p>
        <p className={cn(isIncome ? "text-accent-green" : "text-accent-red", "text-right text-xs font-semibold")}>
          {isIncome ? "" : "-"}
          {toCurrency(transaction.amount, user?.currency)}
        </p>
        <p className="col-span-2 text-xs italic">{transaction.category.name}</p>
        <p className="text-right text-xs">{format(transaction.transactionDate, "MMM dd, yyyy")}</p>
        <p className="col-span-2 text-xs">{transaction.account.name}</p>
        <p className="text-right text-xs capitalize">{transaction.account.type}</p>
      </div>
    </Link>
  );
};

export default TransactionCard;
