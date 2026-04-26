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
import { useAddGenreMutation } from '../../../store/api';

export interface AddGenreModalProps {
  open: boolean;
  onClose: () => void;
}

type AddGenreFormValues = {
  name: string;
  description: string;
};

const AddGenreModal: FC<AddGenreModalProps> = ({ open, onClose }) => {
  const [addGenre, { isLoading }] = useAddGenreMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AddGenreFormValues>({
    defaultValues: { name: '', description: '' },
  });

  useEffect(() => {
    if (open) {
      reset({ name: '', description: '' });
    }
  }, [open, reset]);

  const handleClose = () => {
    reset({ name: '', description: '' });
    onClose();
  };

  const onSubmit = async (data: AddGenreFormValues) => {
    await addGenre({
      name: data.name.trim(),
      description: data.description.trim(),
    });
    handleClose();
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
                <CategoryIcon color="primary" />
                <Typography variant="h6" component="h2">
                  Add genre
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
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddGenreModal;
