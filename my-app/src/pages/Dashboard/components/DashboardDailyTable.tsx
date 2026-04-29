import type { FC } from 'react';
import { Paper, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { Dashboard } from '../../../types/Game';

export interface DashboardDailyTableProps {
  daily: Dashboard['daily'];
}

type DailyRow = Dashboard['daily'][number];

const DashboardDailyTable: FC<DashboardDailyTableProps> = ({ daily }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dailyColumns: GridColDef<DailyRow>[] = [
    {
      field: 'date',
      headerName: 'Date',
      flex: isMobile ? 1 : 3,
      renderCell: (params) => (
        <Tooltip title={params.row.date}>
          <span>{params.row.date}</span>
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

  return (
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
};

export default DashboardDailyTable;
