import { useParams } from 'react-router-dom';
import { API_ORIGIN } from '../api/axios';
import {
  Grid,
  Typography,
  CardMedia,
  Stack,
  Button,
  Divider,
} from '@mui/material';
import CompanyIcon from '@mui/icons-material/Apartment';
import GameDescription from '../components/GameDescription';
import GameInfoCard from '../components/GameInfoCard';
import { useGetGameQuery } from '../store/api';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReviewTag from '../components/ReviewTag';
import GameReviews from '../components/GameReviews';
import FullScreenProgress from '../components/FullScreenProgress';
import Breadcrumbs from '../components/Breadcrumbs';
import StoreIcon from '@mui/icons-material/Store';

const GameDetails = () => {
  const { id } = useParams();

  const { data: game, isFetching: isFetchingGame } = useGetGameQuery({
    id: Number(id),
  });

  if (isFetchingGame) return <FullScreenProgress />;

  return (
    <Grid sx={{ maxWidth: 'xl', margin: '0 auto', p: 2 }} container spacing={2}>
      <Grid size={12}>
        <Breadcrumbs
          paths={[
            { label: 'Store', path: '/', icon: <StoreIcon /> },
            { label: game?.name, path: `/game/${id}` },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <CardMedia
          component="img"
          image={`${API_ORIGIN}${game?.imageUrl}`}
          alt={game?.name}
          sx={{ borderRadius: 2, maxHeight: '600px', objectFit: 'cover' }}
        />
      </Grid>
      <Grid size={6}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {game?.name}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={4}>
                <GameInfoCard
                  color="secondary.main"
                  icon={<CompanyIcon color="secondary" />}
                  label="Publisher"
                  value={game?.publisherName}
                />
              </Grid>
              <Grid size={4}>
                <GameInfoCard
                  color="warning.main"
                  icon={<DateRangeIcon color="warning" />}
                  label="Release Date"
                  value={game?.releaseDate}
                />
              </Grid>
              <Grid size={4}>
                <GameInfoCard
                  color="success.main"
                  icon={<PersonIcon color="success" />}
                  label="Players"
                  value={game?.mostOneTimePlayers}
                />
              </Grid>
            </Grid>
            <GameDescription description={game?.description} />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {game?.currentPrice?.amount} {game?.currentPrice?.currencySymbol}
            </Typography>
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
            >
              Buy now
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Overall Rating
        </Typography>
        <ReviewTag rating={game?.rating} />
      </Stack>
      <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Divider sx={{ width: '100%', backgroundColor: 'white' }} />
      </Grid>
      <Grid size={12}>
        <GameReviews />
      </Grid>
    </Grid>
  );
};

export default GameDetails;
