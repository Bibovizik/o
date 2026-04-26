import type { FC } from 'react';
import { Paper } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { Dashboard } from '../../../types/Game';

export interface DashboardDailyTableProps {
  daily: Dashboard['daily'];
}

type DailyRow = Dashboard['daily'][number];

const dailyColumns: GridColDef<DailyRow>[] = [
  {
    field: 'date',
    headerName: 'Date',
    flex: 3,
    minWidth: 160,
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

const DashboardDailyTable: FC<DashboardDailyTableProps> = ({ daily }) => (
  <Paper sx={{ width: '100%' }}>
    <DataGrid
      rows={daily}
      columns={dailyColumns}
      getRowId={(row) => row.date}
      autoHeight
      disableRowSelectionOnClick
      disableColumnMenu
      hideFooter
    />
  </Paper>
);

export default DashboardDailyTable;
