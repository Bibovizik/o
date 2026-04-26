import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CategoryIcon from '@mui/icons-material/Category';
import { modalStyles } from '../../../components/styles';
import {
  useAddGenreMutation,
  useUpdateGenreMutation,
} from '../../../store/api';
import type { Genre } from '../../../types/Game';

export interface GenreModalProps {
  open: boolean;
  onClose: () => void;
  /** When set, the modal edits this genre; otherwise it adds a new one */
  genre?: Genre | null;
}

type GenreFormValues = {
  name: string;
  description: string;
};

const GenreModal: FC<GenreModalProps> = ({ open, onClose, genre }) => {
  const [addGenre, { isLoading: isAdding }] = useAddGenreMutation();
  const [updateGenre, { isLoading: isUpdating }] = useUpdateGenreMutation();
  const isEdit = Boolean(genre);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<GenreFormValues>({
    defaultValues: { name: '', description: '' },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: genre?.name ?? '',
        description: genre?.description ?? '',
      });
    }
  }, [open, genre, reset]);

  const handleClose = () => {
    reset({ name: '', description: '' });
    onClose();
  };

  const onSubmit = async (data: GenreFormValues) => {
    const name = data.name.trim();
    const description = data.description.trim();
    if (isEdit && genre) {
      await updateGenre({ genreId: genre.genreId, name, description });
    } else {
      await addGenre({ name, description });
    }
    handleClose();
  };

  const isLoading = isAdding || isUpdating;

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
                <CategoryIcon color="primary" />
                <Typography variant="h6" component="h2">
                  {isEdit ? 'Edit genre' : 'Add genre'}
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
              fullWidth
              required
              label="Name"
              {...register('name', { required: true })}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              required
              label="Description"
              multiline
              minRows={3}
              {...register('description', { required: true })}
            />
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
              {isEdit ? 'Save' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default GenreModal;
