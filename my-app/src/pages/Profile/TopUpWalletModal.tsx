import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { Modal } from '@mui/material';
import type { FC } from 'react';
import { modalStyles } from '../../components/styles';
import { useForm } from 'react-hook-form';
import type { TopUpWallet } from '../../types/User';
import { useTopUpWalletMutation } from '../../store/api';
import MoneyIcon from '@mui/icons-material/Money';

interface TopUpWalletModalProps {
  open: boolean;
  onClose: () => void;
}

const TopUpWalletModal: FC<TopUpWalletModalProps> = ({ open, onClose }) => {
  const [topUpWallet, { isLoading }] = useTopUpWalletMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TopUpWallet>({
    defaultValues: {
      amount: 0,
      description: '',
    },
  });

  const onSubmit = async (data: TopUpWallet) => {
    await topUpWallet(data);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={modalStyles}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h6">Top Up Wallet</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              {...register('amount')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Reason"
              type="text"
              {...register('description')}
            />
          </Grid>
          <Grid size={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading || !isValid}
              startIcon={<MoneyIcon />}
            >
              Top Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default TopUpWalletModal;
