import {
  Box,
  Button,
  Stack,
  IconButton,
  Grid,
  Modal,
  Typography,
  Divider,
  Alert,
} from '@mui/material';
import type { FC } from 'react';
import { modalStyles } from './styles';
import {
  useGetGameQuery,
  useGetWalletQuery,
  usePurchaseGameMutation,
} from '../store/api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

interface BuyGameModalProps {
  open: boolean;
  onClose: () => void;
  gameId: number;
}

const BuyGameModal: FC<BuyGameModalProps> = ({ open, gameId, onClose }) => {
  const { data: game } = useGetGameQuery({ id: gameId! });
  const [purchaseGame] = usePurchaseGameMutation();
  const { data: wallet } = useGetWalletQuery({});

  const handleBuy = async () => {
    await purchaseGame({ id: gameId! });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'space-between' }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <ShoppingCartIcon color="primary" />
                <Typography variant="h6" component="h2">
                  Buy{' '}
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: 'primary.main', fontWeight: 'bold' }}
                  >
                    {game?.name}
                  </Typography>
                </Typography>
              </Stack>
              <IconButton type="button" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1">{game?.description}</Typography>
          </Grid>
          <Grid size={12}>
            <Divider sx={{ backgroundColor: 'white' }} />
          </Grid>
          <Grid size={12}>
            <Typography variant="body1">
              Your current balance:{' '}
              <strong>
                {wallet?.balances[0]?.availableAmount}{' '}
                {wallet?.balances[0]?.currencyCode}
              </strong>
            </Typography>
            <Typography variant="body1">
              Your balance after purchase:{' '}
              {wallet?.balances[0]?.availableAmount}{' '}
              {wallet?.balances[0]?.currencyCode} - {game?.currentPrice.amount}{' '}
              {game?.currentPrice.currencyCode} ={' '}
              <strong>
                {wallet?.balances[0]?.availableAmount -
                  game?.currentPrice.amount}{' '}
                {wallet?.balances[0]?.currencyCode}
              </strong>
            </Typography>
          </Grid>
          <Grid size={12}>
            <Alert variant="outlined" severity="warning">
              This purchase is not refundable.
            </Alert>
          </Grid>
          <Grid size={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'end', alignItems: 'center' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {game?.currentPrice.amount} {game?.currentPrice.currencySymbol}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBuy}
                startIcon={<ShoppingCartIcon />}
              >
                Buy
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BuyGameModal;
