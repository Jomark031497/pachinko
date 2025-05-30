import { useState, useMemo } from "react";

interface UsePaginationOptions {
  initialPage: number;
  initialLimit: number;
}

const usePagination = ({ initialPage = 1, initialLimit = 5 }: UsePaginationOptions) => {
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(initialLimit);

  const offset = useMemo(() => (page - 1) * limit, [page, limit]);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return {
    page,
    limit,
    offset,
    nextPage,
    prevPage,
  };
};

export default usePagination;
