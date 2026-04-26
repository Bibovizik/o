import type { FC } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Modal,
  Stack,
  Typography,
  Grid,
  Button,
  IconButton,
  CircularProgress,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useGetGenresQuery, usePublishGameMutation } from '../../../store/api';
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
  genreIds: [],
  priceOverrides: {
    US: 0,
    GB: 0,
    PL: 0,
    EU: 0,
    TR: 0,
    JP: 0,
    CA: 0,
  },
};

const PublishGameModal: FC<PublishGameModalProps> = ({ open, onClose }) => {
  const [publishGame, { isLoading }] = usePublishGameMutation();
  const { data: genres } = useGetGenresQuery();
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
    const overrides = Object.entries(data.priceOverrides ?? {})
      .map(([marketCode, price]) => ({ marketCode, amount: Number(price) }))
      .filter((row) => Number.isFinite(row.amount) && row.amount > 0);

    await publishGame({
      name: data.name,
      releaseDate: data.releaseDate,
      description: data.description,
      basePriceUah: Number(data.basePriceUah) || 0,
      mostOneTimePlayers: Number(data.mostOneTimePlayers) || 0,
      ...(data.image ? { image: data.image } : {}),
      marketPriceOverridesJson: JSON.stringify(overrides),
      ...(data.genreIds.length > 0
        ? { genreIdsJson: JSON.stringify(data.genreIds) }
        : {}),
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
          <Grid
            container
            spacing={3}
            size={12}
            sx={{ maxHeight: '70vh', overflow: 'auto' }}
          >
            <Grid size={6}>
              <PublishGameNameField control={control} />
            </Grid>
            <Grid size={6}>
              <PublishGameReleaseDateField control={control} />
            </Grid>
            <Grid size={12}>
              <PublishGameDescriptionField control={control} />
            </Grid>
            <Grid size={12}>
              <PublishGameMostOneTimePlayersField control={control} />
            </Grid>
            <Grid size={12}>
              <PublishGameBasePriceField control={control} />
            </Grid>
            <Grid size={12}>
              <Controller
                control={control}
                name="genreIds"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="publish-game-genres-label">Genres</InputLabel>
                    <Select<number[]>
                      labelId="publish-game-genres-label"
                      multiple
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value as number[] | string[];
                        field.onChange(
                          (value as Array<string | number>).map((v) =>
                            typeof v === 'number' ? v : Number(v),
                          ),
                        );
                      }}
                      input={<OutlinedInput label="Genres" />}
                      renderValue={(selected) => {
                        const ids = selected as number[];
                        const labels =
                          genres
                            ?.filter((g) => ids.includes(g.genreId))
                            .map((g) => g.name) ?? [];
                        return labels.join(', ');
                      }}
                    >
                      {genres?.map((genre) => (
                        <MenuItem key={genre.genreId} value={genre.genreId}>
                          <Checkbox checked={field.value.includes(genre.genreId)} />
                          <ListItemText primary={genre.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={12}>
              <Stack direction="column" spacing={2}>
                <Typography variant="body1">Game cover image</Typography>
                <PublishGameCoverImageField control={control} />
              </Stack>
            </Grid>
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
