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

export default TransactionCard;
