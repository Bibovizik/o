import { useState, type FC } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useDeleteGameMutation } from '../../../store/api';

export interface DashboardGameActionsCellProps {
  copiesSold: number;
  gameId: number;
  gameName: string;
  onEdit: () => void;
}

const DashboardGameActionsCell: FC<DashboardGameActionsCellProps> = ({
  copiesSold,
  gameId,
  gameName,
  onEdit,
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteGame, { isLoading: isDeleting }] = useDeleteGameMutation();

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}
    >
      <Tooltip title="Edit game">
        <IconButton
          color="primary"
          size="small"
          onClick={onEdit}
          aria-label={`Edit ${gameName}`}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={
          copiesSold > 0
            ? `Game "${gameName}" has ${copiesSold} copies sold, cannot be deleted`
            : 'Delete game'
        }
      >
        <span>
          <IconButton
            color="error"
            size="small"
            onClick={() => setDeleteOpen(true)}
            disabled={isDeleting || copiesSold > 0}
            aria-label={`Delete ${gameName}`}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
      <ConfirmationModal
        title={`Delete "${gameName}"?`}
        description={`Are you sure you want to delete the game "${gameName}"? This action cannot be undone.`}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        loading={isDeleting}
        onConfirm={async () => {
          await deleteGame(gameId);
          setDeleteOpen(false);
        }}
      />
    </Stack>
  );
};

export default DashboardGameActionsCell;
