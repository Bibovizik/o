import { useState } from 'react';
import { API_ORIGIN } from '../api/axios';
import '../App.css';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useGetGamesQuery } from '../store/api';
import { useNavigate } from 'react-router-dom';
import CompanyIcon from '@mui/icons-material/Apartment';
import GameDescription from '../components/GameDescription';
import GamesIcon from '@mui/icons-material/Games';
import FullScreenProgress from '../components/FullScreenProgress';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: games, isFetching } = useGetGamesQuery({});
  const navigate = useNavigate();

  const filteredGames = games?.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Grid sx={{ maxWidth: 'xl', margin: '0 auto', p: 2 }} container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5">Featured & Recommended</Typography>
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
        {filteredGames?.map((game) => (
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }} key={game.gameId}>
            <Card key={game.gameId}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {game.name}
                  </Typography>
                  <CardMedia
                    component="img"
                    image={`${API_ORIGIN}${game.imageUrl}`}
                    alt={game.name}
                    sx={{ borderRadius: 2 }}
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <Tooltip title="Publisher">
                      <CompanyIcon color="secondary" />
                    </Tooltip>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {game.publisherName}
                    </Typography>
                  </Stack>
                  <GameDescription description={game.description} />
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: 'end', p: 2, gap: 2 }}>
                {game.isOwnedByCurrentUser ? (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <CheckIcon color="success" />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Owned
                    </Typography>
                  </Stack>
                ) : (
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                  >
                    Buy Now
                  </Button>
                )}
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(`/game/${game.gameId}`)}
                  startIcon={<GamesIcon />}
                >
                  See more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Store;
