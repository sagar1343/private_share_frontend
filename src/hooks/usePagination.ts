import { useState, useEffect } from "react";

interface UsePaginationProps {
  dependencies?: unknown[];
}

interface UsePaginationReturn {
  page: number;
  setPage: (page: number) => void;
  onNext: (hasNext: boolean) => void;
  onPrevious: (hasPrevious: boolean) => void;
  resetPage: () => void;
}

export default function usePagination({
  dependencies = [],
}: UsePaginationProps): UsePaginationReturn {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, dependencies);

  const onNext = (hasNext: boolean) => {
    if (hasNext) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onPrevious = (hasPrevious: boolean) => {
    if (hasPrevious) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const resetPage = () => {
    setPage(1);
  };

  return {
    page,
    setPage,
    onNext,
    onPrevious,
    resetPage,
  };
}
