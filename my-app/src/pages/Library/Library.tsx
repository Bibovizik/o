import { useState } from 'react';
import { useGetLibraryGamesQuery } from '../../store/api';
import StoreGrid from '../Store/components/StoreGrid';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: games, isFetching } = useGetLibraryGamesQuery();

  const filteredGames = games?.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <StoreGrid
      filteredGames={filteredGames}
      isFetching={isFetching}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default Library;
