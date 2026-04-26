import { useEffect } from "react";

const useFetchNextPage = (inView: boolean, hasNextPage: boolean, isFetchingNextPage: boolean, fetchNextPage: () => void) => {
  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);
};

export default useFetchNextPage;