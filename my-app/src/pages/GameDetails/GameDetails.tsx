import { useParams } from 'react-router-dom';
import { API_ORIGIN } from '../../api/axios';
import { Chip, Grid, Typography, Stack, Button, Divider } from '@mui/material';
import CompanyIcon from '@mui/icons-material/Apartment';
import GameDescription from '../../components/GameDescription';
import GameInfoCard from './components/GameInfoCard';
import { useGetGameQuery } from '../../store/api';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReviewTag from '../../components/ReviewTag';
import GameReviews from '../../components/GameReviews';
import FullScreenProgress from '../../components/FullScreenProgress';
import Breadcrumbs from '../../components/Breadcrumbs';
import StoreIcon from '@mui/icons-material/Store';
import GameCardMedia from '../../components/GameCardMedia';
import GamesIcon from '@mui/icons-material/Games';
import BuyGameModal from '../../components/BuyGameModal';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DnsIcon from '@mui/icons-material/Dns';

const GameDetails = () => {
  const { id, isLibrary } = useParams();
  const [showBuyGameModal, setShowBuyGameModal] = useState(false);

  const { data: game, isFetching: isFetchingGame } = useGetGameQuery({
    id: Number(id),
  });

  if (isFetchingGame) return <FullScreenProgress />;

  return (
    <Grid sx={{ maxWidth: 'xl', margin: '0 auto', p: 2 }} container spacing={2}>
      <Grid size={12}>
        <Breadcrumbs
          paths={[
            {
              label: isLibrary ? 'Library' : 'Store',
              path: isLibrary ? '/library' : '/',
              icon: isLibrary ? <GamesIcon /> : <StoreIcon />,
            },
            { label: game?.name, path: `/game/${id}` },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <GameCardMedia
          src={`${API_ORIGIN}${game?.imageUrl}`}
          alt={game?.name}
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
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <GameInfoCard
                  color="secondary.main"
                  icon={<CompanyIcon color="secondary" />}
                  label="Publisher"
                  value={game?.publisherName}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <GameInfoCard
                  color="warning.main"
                  icon={<DateRangeIcon color="warning" />}
                  label="Release Date"
                  value={game?.releaseDate}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <GameInfoCard
                  color="success.main"
                  icon={<PersonIcon color="success" />}
                  label="Players"
                  value={game?.mostOneTimePlayers}
                />
              </Grid>
            </Grid>
            <GameDescription description={game?.description} />
            {game?.systemRequirements && (
              <Stack spacing={1}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: 'center' }}
                >
                  <DnsIcon color="primary" />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    System requirements
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  {Object.entries(game?.systemRequirements ?? {}).map(
                    ([key, value]) => (
                      <Typography variant="body1" key={key}>
                        <strong>{key.toUpperCase()}</strong> {value}
                      </Typography>
                    ),
                  )}
                </Stack>
              </Stack>
            )}
            {game?.genres?.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {game.genres.map((genre) => (
                  <Chip
                    key={genre.name}
                    variant="outlined"
                    color="info"
                    label={genre.name}
                  />
                ))}
              </Stack>
            )}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {game?.currentPrice?.amount} {game?.currentPrice?.currencySymbol}
            </Typography>
            {game?.isOwnedByCurrentUser ? (
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
                onClick={() => setShowBuyGameModal(true)}
              >
                Buy now
              </Button>
            )}
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
      {showBuyGameModal && (
        <BuyGameModal
          open={showBuyGameModal}
          onClose={() => setShowBuyGameModal(false)}
          gameId={game.gameId}
        />
      )}
    </Grid>
  );
};

export default GameDetails;
