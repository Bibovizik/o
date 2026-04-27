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
  TextField,
  MenuItem,
} from '@mui/material';
import {
  useEditGameMutation,
  useGetGamePricesQuery,
  useGetGameQuery,
  useGetGenresQuery,
  usePublishGameMutation,
} from '../../../store/api';
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import SaveIcon from '@mui/icons-material/Save';
import type {
  Game,
  GamePrice,
  Genre,
  PublishGameFormValues,
  SystemRequirements,
} from '../../../types/Game';
import GameIcon from '@mui/icons-material/Games';
import {
  PublishGameNameField,
  PublishGameReleaseDateField,
  PublishGameDescriptionField,
  PublishGameBasePriceField,
  PublishGameMostOneTimePlayersField,
  PublishGameCoverImageField,
  PublishGameGenresField,
} from './inputs';
import { modalStyles } from '../../../components/styles';

interface PublishGameModalProps {
  open: boolean;
  onClose: () => void;
  editingGameId?: number | null;
}

const defaultFormValues: PublishGameFormValues = {
  name: '',
  releaseDate: '2026-04-25',
  description: '',
  basePriceUah: '',
  mostOneTimePlayers: '',
  image: undefined,
  genreIds: [],
  systemRequirementsOs: '',
  systemRequirementsCpu: '',
  systemRequirementsGpu: '',
  systemRequirementsRam: '',
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

const buildFormValuesFromGame = (
  game: Game,
  genresList: Genre[] | undefined,
  gamePrices: GamePrice[] | undefined,
): PublishGameFormValues => {
  const genreIds =
    genresList
      ?.filter((g) => game.genres.some((gg) => gg.name === g.name))
      .map((g) => g.genreId) ?? [];
  const release =
    game.releaseDate.length >= 10
      ? game.releaseDate.slice(0, 10)
      : game.releaseDate;

  let systemReqs: Partial<SystemRequirements> | undefined;
  try {
    const parsed = game.systemRequirements;
    if (parsed && typeof parsed === 'object') {
      systemReqs = parsed as Partial<SystemRequirements>;
    }
  } catch {
    // ignore non-JSON system requirements
  }

  return {
    name: game.name,
    releaseDate: release,
    description: game.description,
    basePriceUah: String(game.basePriceUah),
    mostOneTimePlayers: String(game.mostOneTimePlayers),
    image: undefined,
    genreIds,
    systemRequirementsOs:
      systemReqs?.os === 'Windows' ||
      systemReqs?.os === 'MacOS' ||
      systemReqs?.os === 'Linux'
        ? systemReqs.os
        : '',
    systemRequirementsCpu: systemReqs?.cpu ?? '',
    systemRequirementsGpu: systemReqs?.gpu ?? '',
    systemRequirementsRam:
      typeof systemReqs?.ram === 'number' && Number.isFinite(systemReqs.ram)
        ? String(systemReqs.ram)
        : '',
    priceOverrides: gamePrices
      ?.filter((price) => price.marketCode !== 'UA')
      .reduce(
        (acc, price) => {
          acc[price.marketCode] = price.amount;
          return acc;
        },
        {} as Record<string, number>,
      ),
  };
};

const PublishGameModal: FC<PublishGameModalProps> = ({
  open,
  onClose,
  editingGameId,
}) => {
  const isEdit = editingGameId != null;
  const [publishGame, { isLoading: isPublishing }] = usePublishGameMutation();
  const [editGame, { isLoading: isEditing }] = useEditGameMutation();
  const { data: genres } = useGetGenresQuery();
  const { data: game, isFetching: isFetchingGame } = useGetGameQuery(
    { id: editingGameId! },
    { skip: !open || !isEdit },
  );
  const { data: gamePrices, isFetching: isFetchingGamePrices } =
    useGetGamePricesQuery({ id: editingGameId! }, { skip: !open || !isEdit });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PublishGameFormValues>({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (!open) return;
    if (!isEdit) {
      reset(defaultFormValues);
    }
  }, [open, isEdit, reset]);

  useEffect(() => {
    if (!open || !isEdit || !game) return;
    reset(buildFormValuesFromGame(game, genres, gamePrices));
  }, [open, isEdit, game, genres, reset, gamePrices]);

  const isSaving = isPublishing || isEditing;
  const editFormReady = isEdit && Boolean(game);
  const submitDisabled =
    isSaving || !isValid || (isEdit && (isFetchingGame || !editFormReady));

  const onSubmit = async (data: PublishGameFormValues) => {
    const overrides = Object.entries(data.priceOverrides ?? {})
      .map(([marketCode, price]) => ({ marketCode, amount: Number(price) }))
      .filter((row) => Number.isFinite(row.amount) && row.amount > 0);

    const systemRequirementsObj: Partial<SystemRequirements> = {};
    if (data.systemRequirementsOs)
      systemRequirementsObj.os = data.systemRequirementsOs;
    if (data.systemRequirementsCpu?.trim())
      systemRequirementsObj.cpu = data.systemRequirementsCpu.trim();
    if (data.systemRequirementsGpu?.trim())
      systemRequirementsObj.gpu = data.systemRequirementsGpu.trim();
    const ramNum = Number(data.systemRequirementsRam);
    if (
      data.systemRequirementsRam?.trim() &&
      Number.isFinite(ramNum) &&
      ramNum > 0
    ) {
      systemRequirementsObj.ram = ramNum;
    }
    const systemRequirementsJson =
      Object.keys(systemRequirementsObj).length > 0
        ? JSON.stringify(systemRequirementsObj)
        : undefined;

    const body = {
      name: data.name,
      releaseDate: data.releaseDate,
      description: data.description,
      basePriceUah: Number(data.basePriceUah) || 0,
      mostOneTimePlayers: Number(data.mostOneTimePlayers) || 0,
      ...(data.image ? { image: data.image } : {}),
      ...(isEdit && !data.image
        ? { preserveExistingImage: true as const }
        : {}),
      marketPriceOverridesJson: JSON.stringify(overrides),
      ...(data.genreIds.length > 0
        ? { genreIdsJson: JSON.stringify(data.genreIds) }
        : {}),
      ...(systemRequirementsJson ? { systemRequirementsJson } : {}),
    };

    if (isEdit && editingGameId != null) {
      await editGame({ id: editingGameId, body });
    } else {
      await publishGame(body);
    }
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
                  {isEdit ? 'Edit game' : 'Publish a game'}
                </Typography>
              </Stack>
              <IconButton type="button" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
          {isEdit && isFetchingGame && isFetchingGamePrices ? (
            <Grid
              size={12}
              sx={{ display: 'flex', justifyContent: 'center', py: 4 }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            <Grid
              container
              spacing={3}
              size={12}
              sx={{ maxHeight: '70vh', overflow: 'auto', pt: 2 }}
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
                <PublishGameGenresField control={control} />
              </Grid>
              <Grid size={12}>
                <Stack direction="column" spacing={2}>
                  <Typography variant="body1">
                    System requirements (optional)
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Controller
                        control={control}
                        name="systemRequirementsOs"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label="OS"
                            value={field.value ?? ''}
                          >
                            <MenuItem value="">Not specified</MenuItem>
                            <MenuItem value="Windows">Windows</MenuItem>
                            <MenuItem value="MacOS">MacOS</MenuItem>
                            <MenuItem value="Linux">Linux</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid size={6}>
                      <Controller
                        control={control}
                        name="systemRequirementsRam"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="RAM (GB)"
                            inputMode="numeric"
                            value={field.value ?? ''}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={6}>
                      <Controller
                        control={control}
                        name="systemRequirementsCpu"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="CPU"
                            value={field.value ?? ''}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={6}>
                      <Controller
                        control={control}
                        name="systemRequirementsGpu"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="GPU"
                            value={field.value ?? ''}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
              <Grid size={12}>
                <Stack direction="column" spacing={2}>
                  <Typography variant="body1">Game cover image</Typography>
                  <PublishGameCoverImageField
                    control={control}
                    requireImage={!isEdit}
                  />
                </Stack>
              </Grid>
            </Grid>
          )}
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={submitDisabled}
              startIcon={
                isSaving ? (
                  <CircularProgress size={20} />
                ) : isEdit ? (
                  <SaveIcon />
                ) : (
                  <PublishIcon />
                )
              }
            >
              {isEdit ? 'Save changes' : 'Publish'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PublishGameModal;
