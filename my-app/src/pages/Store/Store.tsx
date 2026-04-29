import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useFetchNextPage from '../../hooks/useFetchNextPage';
import useDebounce from '../../hooks/useDebounce';
import { useGetGamesInfiniteQuery } from '../../store/api';

import StoreGrid from './components/StoreGrid';

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const {
    data,
    isFetching,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetGamesInfiniteQuery({
    name: debouncedSearchTerm,
    genres: selectedGenres,
  });

  const games = data?.pages.flatMap((page) => page.items) ?? [];

  const { ref: loadMoreRef, inView } = useInView();

  useFetchNextPage(inView, hasNextPage, isFetchingNextPage, fetchNextPage);

  return (
    <StoreGrid
      games={games}
      isFetching={isFetching || isLoading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      loadMoreRef={loadMoreRef}
      hasNextPage={Boolean(hasNextPage)}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
    />
  );
};

export default Store;
