import { useState } from 'react';
import { useGetGamesInfiniteQuery } from '../../store/api';
import StoreGrid from '../Store/components/StoreGrid';
import { useInView } from 'react-intersection-observer';
import useFetchNextPage from '../../hooks/useFetchNextPage';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
    isLibrary: true,
    genres: selectedGenres,
  });

  const games = data?.pages.flatMap((page) => page.items) ?? [];

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const { ref: loadMoreRef, inView } = useInView();

  useFetchNextPage(inView, hasNextPage, isFetchingNextPage, fetchNextPage);

  return (
    <StoreGrid
      games={filteredGames}
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

export default Library;
