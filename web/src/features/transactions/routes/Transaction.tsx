import { lazy, Suspense, useRef } from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import { MdDelete, MdEdit } from "react-icons/md";
import { useParams } from "react-router";
import IconButton from "~/components/ui/IconButton";
import TransactionCard from "~/features/transactions/components/TransactionCard";
import useTransactionById from "~/features/transactions/hooks/useTransactionById";
import { useToggle } from "~/hooks/useToggle";

const UpdateTransactionDialog = lazy(() => import("~/features/transactions/components/UpdateTransactionDialog"));
const DeleteTransactionDialog = lazy(() => import("~/features/transactions/components/DeleteTransactionDialog"));

const Transaction = () => {
  const { id } = useParams();
  const { data: transaction } = useTransactionById(id as string);

  const menuRef = useRef<HTMLDivElement>(null);

  const { close: closeMenu, isOpen: isMenuOpen, toggle: toggleMenu } = useToggle(false);

  const {
    close: closeUpdateTransaction,
    isOpen: isUpdateTransactionOpen,
    open: openUpdateTransaction,
  } = useToggle(false);

  const {
    close: closeDeleteTransaction,
    isOpen: isDeleteTransactionOpen,
    open: openDeleteTransaction,
  } = useToggle(false);

  if (!transaction) return <p>Transaction not found!</p>;

  return (
    <>
      <section>
        <div className="relative mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-gray-500">Transaction</h3>
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
                      openUpdateTransaction();
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
                      openDeleteTransaction();
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

        <TransactionCard transaction={transaction} />
      </section>

      <Suspense fallback={null}>
        <UpdateTransactionDialog
          isOpen={isUpdateTransactionOpen}
          onClose={closeUpdateTransaction}
          transaction={transaction}
        />
      </Suspense>
      <Suspense fallback={null}>
        <DeleteTransactionDialog
          isOpen={isDeleteTransactionOpen}
          onClose={closeDeleteTransaction}
          transaction={transaction}
        />
      </Suspense>
    </>
  );
};

export default Transaction;
