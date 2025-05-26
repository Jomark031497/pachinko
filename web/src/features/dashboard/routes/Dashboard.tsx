import { useUserAccounts } from "~/features/accounts/hooks/useUserAccounts";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { toCurrency } from "~/utils/toCurrency";

export const Dashboard = () => {
  const { user } = useAuth();
  if (!user) throw new Error("user not found.");

  const { data: accounts } = useUserAccounts(user.id);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h3 className="mb-2 font-semibold text-gray-500">Accounts</h3>

        <ul className="flex flex-col gap-2">
          {accounts?.map((item) => (
            <li key={item.id} className="rounded border border-gray-200 bg-white p-2 shadow">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500 capitalize">{item.type}</p>
              <p className="text-end font-semibold">{toCurrency(item.balance)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-gray-500">Transactions</h3>

        <ul className="flex flex-col gap-2">
          {accounts?.map((item) => (
            <li key={item.id} className="rounded border border-gray-200 bg-white p-2 shadow">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500 capitalize">{item.type}</p>
              <p className="text-end font-semibold">{toCurrency(item.balance)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
