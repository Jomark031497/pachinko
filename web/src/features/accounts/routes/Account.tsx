import { lazy, Suspense, useRef, useState } from "react";
import { useParams } from "react-router";
import AccountCard from "~/features/accounts/components/AccountCard";
import useAccountById from "~/features/accounts/hooks/useAccountById";
import AccountTransactionsList from "~/features/transactions/components/AccountTransactionList";
import { MdEdit, MdDelete } from "react-icons/md";
import { useToggle } from "~/hooks/useToggle";
import { Button } from "~/components/ui/Button";
import { Select } from "~/components/ui/Select";
import type { Period } from "~/features/accounts/accounts.schema";
import AccountSummary from "~/features/accounts/components/AccountSummary";
import Menu from "~/components/ui/Menu";
import { IoMdSettings } from "react-icons/io";
import { useAuth } from "~/features/auth/hooks/useAuth";

const UpdateAccountDialog = lazy(() => import("~/features/accounts/components/UpdateAccountDialog"));
const DeleteAccountDialog = lazy(() => import("~/features/accounts/components/DeleteAccountDialog"));
const CreateTransactionDialog = lazy(() => import("~/features/transactions/components/CreateTransactionDialog"));

export default function Account() {
  const { user } = useAuth();

  const { id } = useParams();
  const { data: account } = useAccountById(id as string);
  const { close: closeMenu, isOpen: isMenuOpen, toggle: toggleMenu } = useToggle(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [period, setPeriod] = useState<Period>("this-week");

  const { close: closeUpdateAccount, isOpen: isUpdateAccountOpen, open: openUpdateAccount } = useToggle(false);
  const { close: closeDeleteAccount, isOpen: isDeleteAccountOpen, open: openDeleteAccount } = useToggle(false);
  const {
    close: closeCreateTransaction,
    isOpen: isCreateTransactionOpen,
    open: openCreateTransaction,
  } = useToggle(false);

  if (!account) return <p>Account not found!</p>;

  return (
    <>
      <div className="relative flex flex-col gap-8">
        <section>
          <div className="relative mb-2 flex items-center justify-between">
            <h3 className="text-textSecondary font-semibold">account</h3>

            <Menu
              ref={menuRef}
              icon={<IoMdSettings size={20} />}
              isOpen={isMenuOpen}
              toggle={toggleMenu}
              close={closeMenu}
            >
              <ul className="flex flex-col p-2">
                <li role="menuitem" tabIndex={0} className="w-full cursor-pointer">
                  <button
                    onClick={openUpdateAccount}
                    className="flex w-full cursor-pointer items-center gap-2 p-2 font-semibold text-blue-400 transition-all hover:bg-gray-100"
                  >
                    <MdEdit />
                    Edit
                  </button>
                </li>
                <li role="menuitem" tabIndex={0} className="w-full cursor-pointer">
                  <button
                    onClick={openDeleteAccount}
                    className="text-accent-red flex w-full cursor-pointer items-center gap-2 p-2 font-semibold transition-all hover:bg-gray-100"
                  >
                    <MdDelete />
                    Delete
                  </button>
                </li>
              </ul>
            </Menu>
          </div>

          <AccountCard account={account} currency={user?.currency ?? "USD"} asLink={false} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-textSecondary font-semibold">summary</h3>

            <Select value={period} onChange={(e) => setPeriod(e.target.value as Period)} className="px-4">
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-year">This Year</option>
            </Select>
          </div>

          <AccountSummary accountId={account.id} period={period} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-textSecondary font-semibold">recent transactions</h3>

            <Button onClick={openCreateTransaction} className="px-2 py-1.5 text-xs">
              create transaction
            </Button>
          </div>

          <AccountTransactionsList accountId={account.id} />
        </section>
      </div>

      <Suspense fallback={null}>
        <UpdateAccountDialog account={account} isOpen={isUpdateAccountOpen} onClose={closeUpdateAccount} />
      </Suspense>

      <Suspense fallback={null}>
        <DeleteAccountDialog account={account} isOpen={isDeleteAccountOpen} onClose={closeDeleteAccount} />
      </Suspense>

      <Suspense fallback={null}>
        <CreateTransactionDialog
          isOpen={isCreateTransactionOpen}
          onClose={closeCreateTransaction}
          userId={account.userId}
          accountId={account.id}
        />
      </Suspense>
    </>
  );
}
