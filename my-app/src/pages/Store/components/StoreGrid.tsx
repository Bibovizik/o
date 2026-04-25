import { useState, type FC } from 'react';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useGetProfileQuery } from '../../../store/api';
import { useLocation } from 'react-router-dom';
import PublishIcon from '@mui/icons-material/Publish';
import PublishGameModal from './PublishGameModal';
import FullScreenProgress from '../../../components/FullScreenProgress';
import type { Game } from '../../../types/Game';
import { GameCard } from '.';

interface StoreGridProps {
  filteredGames: Game[];
  isFetching: boolean;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const StoreGrid: FC<StoreGridProps> = ({
  filteredGames,
  isFetching,
  searchTerm,
  setSearchTerm,
}) => {
  const [showPublishGameForm, setShowPublishGameForm] = useState(false);
  const { data: user } = useGetProfileQuery();
  const isPublisher = user?.roles.includes('Publisher');

  const location = useLocation();
  const isLibrary = location.pathname === '/library';

  return (
    <Grid sx={{ maxWidth: 'xl', margin: '0 auto', p: 2 }} container spacing={2}>
      <Grid size={12}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography variant="h5">
            {isLibrary ? 'My Games' : 'Featured & Recommended'}
          </Typography>
          {isPublisher && !isLibrary && (
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<PublishIcon />}
              onClick={() => setShowPublishGameForm(true)}
            >
              Publish a game
            </Button>
          )}
        </Stack>
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>
      <Grid container spacing={2} size={12}>
        {isFetching && <FullScreenProgress />}
        {filteredGames?.length === 0 && (
          <Grid size={12}>
            <Typography variant="body1">No games found</Typography>
          </Grid>
        )}
        {filteredGames?.map((game) => (
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }} key={game.gameId}>
            <GameCard game={game} isLibrary={isLibrary} />
          </Grid>
        ))}
      </Grid>
      <PublishGameModal
        open={showPublishGameForm}
        onClose={() => setShowPublishGameForm(false)}
      />
    </Grid>
  );
};

export default StoreGrid;
