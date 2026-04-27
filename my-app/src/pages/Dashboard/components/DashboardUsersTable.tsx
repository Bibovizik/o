import type { FC } from 'react';
import { Chip, Paper, Stack } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { User } from '../../../types/User';
import roleToColor from '../../Profile/roleToColor';
import DeleteUser from './DeleteUser';

export interface DashboardUsersTableProps {
  users: User[];
}

const DashboardUsersTable: FC<DashboardUsersTableProps> = ({ users }) => {
  const userColumns: GridColDef<User>[] = [
    {
      field: 'userId',
      headerName: 'ID',
      width: 80,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'userName',
      headerName: 'Username',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: 'countryCode',
      headerName: 'Country',
      width: 100,
    },
    {
      field: 'roles',
      headerName: 'Roles',
      flex: 1,
      minWidth: 160,
      sortable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', height: '100%' }}
        >
          {params.row.roles.map((role) => (
            <Chip
              variant="outlined"
              key={role}
              label={role}
              color={roleToColor[role] as ChipProps['color']}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      minWidth: 200,
      sortable: false,
      filterable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <DeleteUser
          userId={params.row.userId}
          userName={params.row.userName}
          accountStatus={params.row.accountStatusCode}
        />
      ),
    },
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={users}
        columns={userColumns}
        getRowId={(row) => row.userId}
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooter
      />
    </Paper>
  );
};

export default DashboardUsersTable;
