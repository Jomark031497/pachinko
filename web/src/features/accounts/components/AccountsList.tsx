import { AccountCard } from "~/features/accounts/components/AccountCard";
import useUserAccounts from "~/features/accounts/hooks/useUserAccounts";
import type { User } from "~/features/auth/auth.types";

interface AccountsListProps {
  userId: User["id"];
}

export default function AccountsList({ userId }: AccountsListProps) {
  const { data: accounts } = useUserAccounts(userId);

  if (!accounts || accounts.length === 0) {
    return (
      <div className="rounded-md bg-gray-50 p-8 text-center text-gray-500">
        <p>No accounts found.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {accounts.map((item) => (
        <li key={item.id}>
          <AccountCard account={item} />
        </li>
      ))}
    </ul>
  );
}
