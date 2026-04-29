import type { FC } from 'react';
import { useState } from 'react';
import { Paper, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { Dashboard } from '../../../types/Game';
import { useGetProfileQuery } from '../../../store/api';
import DashboardGameActionsCell from './DashboardGameActionsCell';
import PublishGameModal from '../../Store/components/PublishGameModal';

export interface DashboardGamesTableProps {
  games: Dashboard['games'];
}

type GameRow = Dashboard['games'][number];

const DashboardGamesTable: FC<DashboardGamesTableProps> = ({ games }) => {
  const { data: user } = useGetProfileQuery();
  const [editingGameId, setEditingGameId] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const gameColumns: GridColDef<GameRow>[] = [
    {
      field: 'gameName',
      headerName: 'Game',
      flex: isMobile ? 1 : 3,
      renderCell: (params) => (
        <Tooltip title={params.row.gameName}>
          <span>{params.row.gameName}</span>
        </Tooltip>
      ),
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
      flex: isMobile ? 0.5 : 1,
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <DashboardGameActionsCell
          copiesSold={params.row.copiesSold}
          gameId={params.row.gameId}
          gameName={params.row.gameName}
          onEdit={() => setEditingGameId(params.row.gameId)}
        />
      ),
    });
  }

  return (
    <>
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
      <PublishGameModal
        open={editingGameId !== null}
        editingGameId={editingGameId}
        onClose={() => setEditingGameId(null)}
      />
    </>
  );
};

export default DashboardGamesTable;
