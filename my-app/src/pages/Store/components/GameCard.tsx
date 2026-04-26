import type { FC } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CompanyIcon from '@mui/icons-material/Apartment';
import GamesIcon from '@mui/icons-material/Games';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import { API_ORIGIN } from '../../../api/axios';
import GameDescription from '../../../components/GameDescription';
import GameCardMedia from '../../../components/GameCardMedia';
import type { Game } from '../../../types/Game';
import { useState } from 'react';
import BuyGameModal from '../../../components/BuyGameModal';

export interface GameCardProps {
  game: Game;
  isLibrary: boolean;
}

const GameCard: FC<GameCardProps> = ({ game, isLibrary }) => {
  const navigate = useNavigate();
  const [showBuyGameModal, setShowBuyGameModal] = useState(false);
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {game.name}
          </Typography>
          <GameCardMedia
            src={`${API_ORIGIN}${game.imageUrl}`}
            alt={game.name}
          />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Tooltip title="Publisher">
              <CompanyIcon color="secondary" />
            </Tooltip>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {game.publisherName}
            </Typography>
          </Stack>
          <GameDescription description={game.description} />
          {game.genres?.length > 0 && (
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
      </CardContent>
      <CardActions sx={{ justifyContent: 'end', p: 2, gap: 2 }}>
        {!isLibrary && (
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {game.currentPrice?.amount} {game.currentPrice?.currencySymbol}
          </Typography>
        )}
        {!isLibrary &&
          (game.isOwnedByCurrentUser ? (
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
              Buy Now
            </Button>
          ))}
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() =>
            navigate(`/game/${game.gameId}${isLibrary ? '/library' : ''}`)
          }
          startIcon={<GamesIcon />}
        >
          See more
        </Button>
      </CardActions>
      {showBuyGameModal && (
        <BuyGameModal
          open={showBuyGameModal}
          onClose={() => setShowBuyGameModal(false)}
          gameId={game.gameId}
        />
      )}
    </Card>
  );
};

export default GameCard;
