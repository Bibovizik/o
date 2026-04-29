import { useState, type FC } from 'react';
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useGetProfileQuery } from '../../../store/api';
import { useLocation } from 'react-router-dom';
import PublishIcon from '@mui/icons-material/Publish';
import PublishGameModal from './PublishGameModal';
import FullScreenProgress from '../../../components/FullScreenProgress';
import type { Game } from '../../../types/Game';
import { GameCard } from '.';
import { useGetGenresQuery } from '../../../store/api';

interface StoreGridProps {
  games: Game[];
  isFetching: boolean;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  loadMoreRef: (node?: Element | null) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

const StoreGrid: FC<StoreGridProps> = ({
  games,
  isFetching,
  searchTerm,
  setSearchTerm,
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
  isError,
  selectedGenres,
  setSelectedGenres,
}) => {
  const [showPublishGameForm, setShowPublishGameForm] = useState(false);
  const { data: user } = useGetProfileQuery();
  const { data: genres } = useGetGenresQuery();
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
      <Grid size={10}>
        <TextField
          fullWidth
          label="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>
      <Grid size={2}>
        <FormControl fullWidth>
          <InputLabel id="publish-game-genres-label">Genres</InputLabel>
          <Select
            fullWidth
            value={selectedGenres}
            renderValue={(selected) => selected.join(', ')}
            multiple
            input={<OutlinedInput label="Genres" />}
            onChange={(e) => {
              setSelectedGenres(e.target.value as string[]);
            }}
          >
            {genres?.map((genre) => (
              <MenuItem key={genre.genreId} value={genre.name}>
                <Checkbox checked={selectedGenres.includes(genre.name)} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={12}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {selectedGenres.map((genre) => (
            <Chip
              key={genre}
              variant="outlined"
              color="info"
              label={genre}
              onDelete={() =>
                setSelectedGenres(selectedGenres.filter((g) => g !== genre))
              }
            />
          ))}
        </Stack>
      </Grid>
      <Grid container spacing={2} size={12}>
        {isFetching && <FullScreenProgress />}
        {isError && (
          <Grid size={12}>
            <Typography variant="body1">Failed to load games</Typography>
          </Grid>
        )}
        {games?.length === 0 && (
          <Grid size={12}>
            <Typography variant="body1">No games found</Typography>
          </Grid>
        )}
        {games?.map((game) => (
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }} key={game.gameId}>
            <GameCard game={game} isLibrary={isLibrary} />
          </Grid>
        ))}
        {!isFetching && !isFetchingNextPage && hasNextPage && (
          <Grid size={12}>
            <div ref={loadMoreRef} style={{ height: '1px' }} />
          </Grid>
        )}
        {isFetchingNextPage && (
          <Grid
            size={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={50} />
          </Grid>
        )}
      </Grid>
      <PublishGameModal
        open={showPublishGameForm}
        onClose={() => setShowPublishGameForm(false)}
      />
    </Grid>
  );
};

export default StoreGrid;
