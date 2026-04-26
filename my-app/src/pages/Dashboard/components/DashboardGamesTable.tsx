import type { FC } from 'react';
import { Paper } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { Dashboard } from '../../../types/Game';
import { useGetProfileQuery } from '../../../store/api';
import DashboardGameDeleteCell from './DashboardGameDeleteCell';

export interface DashboardGamesTableProps {
  games: Dashboard['games'];
}

type GameRow = Dashboard['games'][number];

const DashboardGamesTable: FC<DashboardGamesTableProps> = ({ games }) => {
  const { data: user } = useGetProfileQuery();

  const gameColumns: GridColDef<GameRow>[] = [
    {
      field: 'gameName',
      headerName: 'Game',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'copiesSold',
      headerName: 'Copies Sold',
      flex: 1,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'revenueUah',
      headerName: 'Revenue (UAH)',
      flex: 1,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
    },
  ];

  if (user?.roles.includes('Publisher')) {
    gameColumns.push({
      field: 'actions',
      headerName: 'Actions',
      align: 'right',
      headerAlign: 'right',
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <DashboardGameDeleteCell
          copiesSold={params.row.copiesSold}
          gameId={params.row.gameId}
          gameName={params.row.gameName}
        />
      ),
    });
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={games}
        columns={gameColumns}
        getRowId={(row) => row.gameId}
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooter
      />
    </Paper>
  );
};

export default DashboardGamesTable;
