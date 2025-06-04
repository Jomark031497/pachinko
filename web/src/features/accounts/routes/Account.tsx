import { lazy, Suspense, useEffect, useRef } from "react";
import { useParams } from "react-router";
import IconButton from "~/components/ui/IconButton";
import AccountCard from "~/features/accounts/components/AccountCard";
import useAccountById from "~/features/accounts/hooks/useAccountById";
import AccountTransactionsList from "~/features/transactions/components/AccountTransactionList";
import { MdEdit, MdDelete } from "react-icons/md";
import { useToggle } from "~/hooks/useToggle";
import { CgMoreVerticalO } from "react-icons/cg";
import { Button } from "~/components/ui/Button";

const UpdateAccountDialog = lazy(() => import("~/features/accounts/components/UpdateAccountDialog"));
const DeleteAccountDialog = lazy(() => import("~/features/accounts/components/DeleteAccountDialog"));
const CreateTransactionDialog = lazy(() => import("~/features/transactions/components/CreateTransactionDialog"));

export default function Account() {
  const { id } = useParams();
  const { data: account } = useAccountById(id as string);
  const { close: closeMenu, isOpen: isMenuOpen, toggle: toggleMenu } = useToggle(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { close: closeUpdateAccount, isOpen: isUpdateAccountOpen, open: openUpdateAccount } = useToggle(false);
  const { close: closeDeleteAccount, isOpen: isDeleteAccountOpen, open: openDeleteAccount } = useToggle(false);
  const {
    close: closeCreateTransaction,
    isOpen: isCreateTransactionOpen,
    open: openCreateTransaction,
  } = useToggle(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen, closeMenu]);

  if (!account) return <p>Account not found!</p>;

  return (
    <>
      <div className="relative flex flex-col gap-8">
        <section>
          <div className="relative mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-gray-500">Account</h3>
            <div className="relative" ref={menuRef}>
              <IconButton
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
                aria-label="Toggle account menu"
                className="text-primary"
              >
                <CgMoreVerticalO size={20} />
              </IconButton>

              <div
                role="menu"
                aria-hidden={!isMenuOpen}
                className={`absolute right-0 z-10 mt-2 w-40 origin-top-right transform rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-out ${isMenuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} `}
              >
                <ul className="flex flex-col p-2">
                  <li role="menuitem" tabIndex={0} className="w-full cursor-pointer">
                    <button
                      onClick={() => {
                        closeMenu();
                        openUpdateAccount();
                      }}
                      className="flex w-full cursor-pointer items-center gap-2 p-2 font-semibold text-blue-400 transition-all hover:bg-gray-100"
                    >
                      <MdEdit />
                      Edit
                    </button>
                  </li>
                  <li role="menuitem" tabIndex={0} className="w-full cursor-pointer">
                    <button
                      onClick={() => {
                        closeMenu();
                        openDeleteAccount();
                      }}
                      className="text-accent-red flex w-full cursor-pointer items-center gap-2 p-2 font-semibold transition-all hover:bg-gray-100"
                    >
                      <MdDelete />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <AccountCard account={account} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-500">Recent Transactions</h3>

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
