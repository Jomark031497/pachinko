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
        className={"grid grid-cols-2 rounded border border-dashed border-gray-300 bg-white p-2 text-gray-500 shadow"}
      >
        <p className="text-sm font-semibold">{transaction.name}</p>
        <p
          className={cn(
            transaction.type === "income" ? "text-accent-green" : "text-accent-red",
            "text-right text-sm font-semibold",
          )}
        >
          {toCurrency(transaction.amount)}
        </p>
        <p className="text-sm italic">{transaction.category.name}</p>
        <p className="text-right text-sm">{format(transaction.transaction_date, "MMM dd, yyyy")}</p>
        <p className="text-sm">{transaction.account.name}</p>
        <p className="text-right text-sm">{transaction.account.type}</p>
      </div>
    </Link>
  );
};

export default TransactionCard;
