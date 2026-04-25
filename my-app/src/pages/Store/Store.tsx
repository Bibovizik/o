import { useState } from 'react';

import { useGetGamesQuery } from '../../store/api';

import StoreGrid from './components/StoreGrid';

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: games, isFetching } = useGetGamesQuery({});

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

export default Store;
