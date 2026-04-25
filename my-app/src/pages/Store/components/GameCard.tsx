import type { FC } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
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

export interface GameCardProps {
  game: Game;
  isLibrary: boolean;
}

const GameCard: FC<GameCardProps> = ({ game, isLibrary }) => {
  const navigate = useNavigate();

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
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end', p: 2, gap: 2 }}>
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
            >
              Buy Now
            </Button>
          ))}
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
  );
};

export default GameCard;
