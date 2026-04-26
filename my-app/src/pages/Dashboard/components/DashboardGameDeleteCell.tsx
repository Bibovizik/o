import { useState, type FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useDeleteGameMutation } from '../../../store/api';

export interface DashboardGameDeleteCellProps {
  copiesSold: number;
  gameId: number;
  gameName: string;
}

const DashboardGameDeleteCell: FC<DashboardGameDeleteCellProps> = ({
  copiesSold,
  gameId,
  gameName,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteGame, { isLoading: isDeleting }] = useDeleteGameMutation();

  return (
    <Tooltip
      title={
        copiesSold > 0
          ? `Game "${gameName}" has ${copiesSold} copies sold, cannot be deleted`
          : null
      }
    >
      <span>
        <IconButton
          color="error"
          size="small"
          onClick={() => setOpen(true)}
          disabled={isDeleting || copiesSold > 0}
        >
          <DeleteIcon />
        </IconButton>
        <ConfirmationModal
          title={`Delete "${gameName}"?`}
          description={`Are you sure you want to delete the game "${gameName}"? This action cannot be undone.`}
          open={open}
          onClose={() => setOpen(false)}
          loading={isDeleting}
          onConfirm={async () => {
            await deleteGame(gameId);
            setOpen(false);
          }}
        />
      </span>
    </Tooltip>
  );
};

export default DashboardGameDeleteCell;
