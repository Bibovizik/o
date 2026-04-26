import type { FC, ReactNode, SyntheticEvent } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import type { ButtonProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { modalStyles } from './styles';

export interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: ButtonProps['color'];
  /** Disables actions and shows a spinner on the confirm button */
  loading?: boolean;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  confirmColor = 'primary',
  loading = false,
}) => {
  const handleConfirm = async (e: SyntheticEvent) => {
    e.preventDefault();
    await onConfirm();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyles }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'space-between' }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <WarningIcon color="warning" />
                <Typography variant="h6" component="h2">
                  {title}
                </Typography>
              </Stack>
              <IconButton
                type="button"
                onClick={onClose}
                aria-label="Close"
                disabled={loading}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
          {description != null && description !== '' && (
            <Grid size={12}>
              <Typography variant="body1" component="div">
                {description}
              </Typography>
            </Grid>
          )}
          <Grid size={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
            >
              <Button
                type="button"
                variant="contained"
                color={confirmColor}
                onClick={handleConfirm}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {confirmLabel}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
