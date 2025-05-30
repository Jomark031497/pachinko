import { Link } from "react-router";
import type { TransactionWithCategoryAndAccount } from "~/features/transactions/transactions.schema";
import { toCurrency } from "~/utils/toCurrency";
import { format } from "date-fns";
import { cn } from "~/utils/utils";

interface Props {
  transaction: TransactionWithCategoryAndAccount;
}

const TransactionCard = ({ transaction }: Props) => {
  return (
    <Link to={`/transactions/${transaction.id}`}>
      <div
        className={cn(
          transaction.type === "income" ? "border-green-500 bg-green-100 shadow" : "bg-red-200",
          "grid grid-cols-2 gap-1 rounded border border-dashed border-gray-300 p-2",
        )}
      >
        <p>{transaction.name}</p>
        <p className="text-right">{toCurrency(transaction.amount)}</p>
        <p>{transaction.category.name}</p>
        <p className="text-right">{format(transaction.transaction_date, "MMM dd yyyy")}</p>
        <p>{transaction.account.name}</p>
      </div>
    </Link>
  );
};

export default TransactionCard;
