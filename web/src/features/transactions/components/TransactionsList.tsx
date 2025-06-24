import { useAutoAnimate } from "@formkit/auto-animate/react";
import TransactionCard from "~/features/transactions/components/TransactionCard";
import type { TransactionWithCategoryAndAccount } from "~/features/transactions/transactions.schema";
import type { User } from "~/features/users/users.schema";

interface Props {
  transactions?: TransactionWithCategoryAndAccount[];
  currency: User["currency"];
}

const TransactionsList = ({ transactions, currency }: Props) => {
  const [listParent] = useAutoAnimate();

  if (!transactions) return <p>No transactions</p>;

  return (
    <>
      <ul ref={listParent} className="flex flex-col gap-2">
        {transactions.map((item) => (
          <li key={item.id}>
            <TransactionCard transaction={item} currency={currency} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionsList;
