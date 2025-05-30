import TransactionCard from "~/features/transactions/components/TransactionCard";
import type { TransactionWithCategoryAndAccount } from "~/features/transactions/transactions.schema";

interface Props {
  transactions?: TransactionWithCategoryAndAccount[];
}

const TransactionsList = ({ transactions }: Props) => {
  if (!transactions) return <p>No transactions</p>;

  return (
    <>
      <ul className="flex flex-col gap-4">
        {transactions.map((item) => (
          <li key={item.id}>
            <TransactionCard transaction={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionsList;
