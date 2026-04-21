import { useState } from 'react';
import { API_ORIGIN } from '../api/axios';
import '../App.css';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useGetGamesQuery } from '../store/api';
import { useNavigate } from 'react-router-dom';
import FavoriteIconOutline from '@mui/icons-material/FavoriteBorder';
import CompanyIcon from '@mui/icons-material/Apartment';
import InfoIcon from '@mui/icons-material/Info';

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: games, isLoading } = useGetGamesQuery({ genreFilter: '' });
  const navigate = useNavigate();
  const filteredGames = games?.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid size={12}>
        <Typography variant="h5">Featured & Recommended</Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          sx={{ width: '100%' }}
          label="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>
      <Grid>
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
              width: '100vw',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {filteredGames?.map((game) => (
          <Grid key={game.gameId}>
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
                    sx={{ borderRadius: 2, width: '500px', height: '500px' }}
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <Tooltip title="Publisher">
                      <CompanyIcon color="secondary" />
                    </Tooltip>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {game.publisherName}
                    </Typography>
                  </Stack>
                  <Paper
                    elevation={10}
                    sx={{
                      p: 2,
                      borderLeftColor: 'primary.main',
                      borderLeftWidth: 3,
                      borderLeftStyle: 'solid',
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: '100', color: 'primary.main' }}
                      >
                        About this game
                      </Typography>
                      <Typography variant="body2">{game.desription}</Typography>
                    </Stack>
                  </Paper>
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: 'end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/game/${game.gameId}`)}
                  startIcon={<InfoIcon />}
                >
                  See more
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<FavoriteIconOutline />}
                >
                  Add to Library
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
