import { useMemo } from "react";
import { cn } from "~/utils/utils";

interface Props {
  nextPage: () => void;
  prevPage: () => void;
  page: number;
  totalPages: number;
}

const Pagination = ({ nextPage, page, prevPage, totalPages }: Props) => {
  const hasNextPage = useMemo(() => page >= totalPages, [page, totalPages]);
  const hasPrevPage = useMemo(() => page <= 1, [page]);

  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-2">
        <button
          className={cn(
            "cursor-pointer rounded px-2 font-semibold",
            hasPrevPage
              ? "border border-gray-200 bg-gray-100 text-gray-400"
              : "border border-gray-500 bg-white text-gray-500",
          )}
          disabled={hasPrevPage}
          onClick={prevPage}
        >
          {"<"}
        </button>
        <span className="text-sm font-semibold text-gray-500">
          page {page} of {totalPages}
        </span>
        <button
          className={cn(
            "cursor-pointer rounded px-2 font-semibold",
            hasNextPage
              ? "border border-gray-200 bg-gray-100 text-gray-400"
              : "border border-gray-500 bg-white text-gray-500",
          )}
          disabled={hasNextPage}
          onClick={nextPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
