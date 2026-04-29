import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import { modalStyles } from '../../components/styles';
import { useChangeCountryMutation, useGetProfileQuery } from '../../store/api';
import currencies from '../Store/currencies';

export interface ChangeCountryModalProps {
  open: boolean;
  onClose: () => void;
}

type ChangeCountryFormValues = {
  countryCode: string;
};

const ChangeCountryModal: FC<ChangeCountryModalProps> = ({ open, onClose }) => {
  const { data: user } = useGetProfileQuery();
  const [changeCountry, { isLoading }] = useChangeCountryMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ChangeCountryFormValues>({
    defaultValues: { countryCode: '' },
  });

  useEffect(() => {
    if (!open) return;
    const code = user?.countryCode ?? '';
    const inList = currencies.some((c) => c.marketCode === code);
    reset({ countryCode: inList ? code : '' });
  }, [open, user?.countryCode, reset]);

  const handleClose = () => {
    reset({ countryCode: user?.countryCode ?? '' });
    onClose();
  };

  const onSubmit = async (data: ChangeCountryFormValues) => {
    await changeCountry({ countryCode: data.countryCode });
    handleClose();
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={modalStyles}
      >
        <Grid container spacing={3}>
          <Grid size={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'space-between' }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <PublicIcon color="primary" />
                <Typography variant="h6" component="h2">
                  Change country
                </Typography>
              </Stack>
              <IconButton
                type="button"
                onClick={handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid size={12}>
            <TextField
              select
              fullWidth
              required
              label="Market / country"
              {...register('countryCode', { required: true })}
            >
              <MenuItem value="" disabled>
                Select a market
              </MenuItem>
              {currencies.map((c) => (
                <MenuItem key={c.marketCode} value={c.marketCode}>
                  {c.name} ({c.marketCode})
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isLoading || !isValid}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ChangeCountryModal;
