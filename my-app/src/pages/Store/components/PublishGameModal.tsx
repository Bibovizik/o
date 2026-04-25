import type { FC } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Modal,
  Stack,
  Typography,
  Grid,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { usePublishGameMutation } from '../../../store/api';
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import type { PublishGameFormValues } from '../../../types/Game';
import GameIcon from '@mui/icons-material/Games';
import {
  PublishGameNameField,
  PublishGameReleaseDateField,
  PublishGameDescriptionField,
  PublishGameBasePriceField,
  PublishGameMostOneTimePlayersField,
  PublishGameCoverImageField,
} from './inputs';
import { modalStyles } from '../../../components/styles';

interface PublishGameModalProps {
  open: boolean;
  onClose: () => void;
}

const defaultFormValues: PublishGameFormValues = {
  name: '',
  releaseDate: '2026-04-25',
  description: '',
  basePriceUah: '',
  mostOneTimePlayers: '',
  image: undefined,
};

const PublishGameModal: FC<PublishGameModalProps> = ({ open, onClose }) => {
  const [publishGame, { isLoading }] = usePublishGameMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PublishGameFormValues>({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultFormValues);
    }
  }, [open, reset]);

  const onSubmit = async (data: PublishGameFormValues) => {
    await publishGame({
      name: data.name,
      releaseDate: data.releaseDate,
      description: data.description,
      basePriceUah: Number(data.basePriceUah) || 0,
      mostOneTimePlayers: Number(data.mostOneTimePlayers) || 0,
      ...(data.image ? { image: data.image } : {}),
    });
    reset(defaultFormValues);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
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
                <GameIcon color="primary" />
                <Typography variant="h6" component="h2">
                  Publish a game
                </Typography>
              </Stack>
              <IconButton type="button" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid size={6}>
            <PublishGameNameField control={control} />
          </Grid>
          <Grid size={6}>
            <PublishGameReleaseDateField control={control} />
          </Grid>
          <Grid size={12}>
            <PublishGameDescriptionField control={control} />
          </Grid>
          <Grid size={6}>
            <PublishGameBasePriceField control={control} />
          </Grid>
          <Grid size={6}>
            <PublishGameMostOneTimePlayersField control={control} />
          </Grid>
          <Grid size={12}>
            <Stack direction="column" spacing={2}>
              <Typography variant="body1">Game cover image</Typography>
              <PublishGameCoverImageField control={control} />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isLoading || !isValid}
              startIcon={
                isLoading ? <CircularProgress size={20} /> : <PublishIcon />
              }
            >
              Publish
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PublishGameModal;
