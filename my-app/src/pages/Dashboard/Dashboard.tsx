import { useState, type SyntheticEvent } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  useDeleteGenreMutation,
  useGetDashboardQuery,
  useGetGenresQuery,
  useGetProfileQuery,
  useGetUsersQuery,
} from '../../store/api';
import FullScreenProgress from '../../components/FullScreenProgress';
import GameInfoCard from '../GameDetails/components/GameInfoCard';
import DashboardGamesTable from './components/DashboardGamesTable';
import DashboardDailyTable from './components/DashboardDailyTable';
import DashboardUsersTable from './components/DashboardUsersTable';
import GamesIcon from '@mui/icons-material/Games';
import PersonIcon from '@mui/icons-material/Person';
import MoneyIcon from '@mui/icons-material/Money';
import AddIcon from '@mui/icons-material/Add';
import GenreModal from './components/GenreModal';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmationModal from '../../components/ConfirmationModal';
import type { Genre } from '../../types/Game';

const Dashboard = () => {
  const [tablesTab, setTablesTab] = useState(0);
  const [addGenreOpen, setAddGenreOpen] = useState(false);
  const [showDeleteGenreModal, setShowDeleteGenreModal] =
    useState<Genre | null>(null);
  const [showEditGenreModal, setShowEditGenreModal] = useState<Genre | null>(
    null,
  );
  const { data: dashboard, isFetching: isFetchingDashboard } =
    useGetDashboardQuery();
  const { data: genres, isFetching: isFetchingGenres } = useGetGenresQuery();
  const [deleteGenre, { isLoading: isDeletingGenre }] =
    useDeleteGenreMutation();

  const { data: user } = useGetProfileQuery();
  const isAdmin = Boolean(user?.roles.includes('Admin'));
  const { data: users, isFetching: isFetchingUsers } = useGetUsersQuery(
    undefined,
    { skip: !isAdmin },
  );

  const isFetching =
    isFetchingDashboard ||
    isFetchingGenres ||
    (isAdmin && isFetchingUsers) ||
    isDeletingGenre;

  if (isFetching) return <FullScreenProgress />;

  const handleTablesTabChange = (_: SyntheticEvent, next: number) => {
    setTablesTab(next);
  };

  return (
    <Grid sx={{ maxWidth: 'xl', margin: '0 auto', p: 2 }} container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5" component="h2">
          Dashboard
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <GameInfoCard
          color="secondary.main"
          icon={<GamesIcon color="secondary" />}
          label="Publisher"
          value={dashboard?.totals.gameCount}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <GameInfoCard
          color="success.main"
          icon={<PersonIcon color="success" />}
          label="Total Users"
          value={dashboard?.totals.copiesSold}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 4 }}>
        <GameInfoCard
          color="warning.main"
          icon={<MoneyIcon color="warning" />}
          label="Total Revenue"
          value={dashboard?.totals.revenueUah}
        />
      </Grid>
      {isAdmin && (
        <Grid size={12}>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="primary">
              Initialize data
            </Button>
          </Stack>
        </Grid>
      )}
      {isAdmin && (
        <Grid size={12}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Genres
            </Typography>
            {genres?.map((genre) => (
              <Chip
                variant="outlined"
                color="info"
                key={genre.genreId}
                label={genre.name}
                deleteIcon={<DeleteIcon />}
                clickable
                onClick={() => setShowEditGenreModal(genre)}
                onDelete={() => setShowDeleteGenreModal(genre)}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setAddGenreOpen(true)}
            >
              Add Genre
            </Button>
          </Stack>
        </Grid>
      )}
      <Grid size={12}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Tabs
            value={tablesTab}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleTablesTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', px: 1 }}
            aria-label="Dashboard statistics tables"
          >
            <Tab label="Games" id="dashboard-tab-games" />
            <Tab label="Daily" id="dashboard-tab-daily" />
            {isAdmin && <Tab label="Users" id="dashboard-tab-users" />}
          </Tabs>
          <Box sx={{ p: 2 }} role="tabpanel" hidden={tablesTab !== 0}>
            {tablesTab === 0 && (
              <DashboardGamesTable games={dashboard?.games ?? []} />
            )}
          </Box>
          <Box sx={{ p: 2 }} role="tabpanel" hidden={tablesTab !== 1}>
            {tablesTab === 1 && (
              <DashboardDailyTable daily={dashboard?.daily ?? []} />
            )}
          </Box>
          {isAdmin && (
            <Box sx={{ p: 2 }} role="tabpanel" hidden={tablesTab !== 2}>
              {tablesTab === 2 && <DashboardUsersTable users={users ?? []} />}
            </Box>
          )}
        </Paper>
      </Grid>
      <GenreModal open={addGenreOpen} onClose={() => setAddGenreOpen(false)} />
      <GenreModal
        open={showEditGenreModal !== null}
        genre={showEditGenreModal}
        onClose={() => setShowEditGenreModal(null)}
      />
      <ConfirmationModal
        title={`Delete Genre ${showDeleteGenreModal?.name}?`}
        description="Are you sure you want to delete this genre?"
        open={showDeleteGenreModal !== null}
        onClose={() => setShowDeleteGenreModal(null)}
        onConfirm={async () => {
          await deleteGenre(showDeleteGenreModal?.genreId);
          setShowDeleteGenreModal(null);
        }}
      />
    </Grid>
  );
};

export default Dashboard;
