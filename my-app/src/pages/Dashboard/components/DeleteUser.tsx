import { useState, type FC } from 'react';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../../components/ConfirmationModal';
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useGetProfileQuery,
} from '../../../store/api';
import { UserStatus } from '../../../types/User';

export interface DeleteUserProps {
  userId: number;
  userName: string;
  accountStatus?: UserStatus;
}

const DeleteUser: FC<DeleteUserProps> = ({
  userId,
  userName,
  accountStatus = UserStatus.Active,
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const { data: profile } = useGetProfileQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [changeUserStatus, { isLoading: isChangingStatus }] =
    useChangeUserStatusMutation();
  const isSelf = profile?.userId === userId;

  const isBanned = accountStatus === UserStatus.Banned;
  const banLabel = isBanned ? 'Unban' : 'Ban';

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ alignItems: 'center', justifyContent: 'end' }}
    >
      <Tooltip
        title={
          isSelf ? 'You cannot change the status of your own account' : null
        }
      >
        <span>
          <Button
            size="small"
            variant="outlined"
            color={isBanned ? 'success' : 'warning'}
            disabled={isSelf || isChangingStatus}
            onClick={() => setStatusOpen(true)}
          >
            {banLabel}
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={isSelf ? 'You cannot delete your own account' : null}>
        <span>
          <IconButton
            color="error"
            size="small"
            aria-label={`Delete user ${userName}`}
            disabled={isDeleting || isSelf}
            onClick={() => setDeleteOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
          <ConfirmationModal
            title={`Delete user ${userName}?`}
            description={`Are you sure you want to delete the user "${userName}"? This action cannot be undone.`}
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            loading={isDeleting}
            confirmColor="error"
            onConfirm={async () => {
              await deleteUser(userId);
              setDeleteOpen(false);
            }}
          />
        </span>
      </Tooltip>
      <ConfirmationModal
        title={isBanned ? `Unban user ${userName}?` : `Ban user ${userName}?`}
        description={
          isBanned
            ? `Allow "${userName}" to sign in and use the platform again?`
            : `The user "${userName}" will be blocked from signing in until unbanned.`
        }
        open={statusOpen}
        onClose={() => setStatusOpen(false)}
        loading={isChangingStatus}
        confirmLabel={banLabel}
        confirmColor={isBanned ? 'success' : 'warning'}
        onConfirm={async () => {
          await changeUserStatus({
            userId,
            accountStatus: isBanned ? UserStatus.Active : UserStatus.Banned,
          });
          setStatusOpen(false);
        }}
      />
    </Stack>
  );
};

export default DeleteUser;
