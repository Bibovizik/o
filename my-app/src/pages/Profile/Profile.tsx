import {
  Avatar,
  Button,
  Chip,
  Stack,
  Typography,
  Grid,
  Card,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
} from '@mui/material';
import type { Role } from '../../types/User';
import { useGetProfileQuery, useGetWalletQuery } from '../../store/api';
import TopUpWalletModal from './TopUpWalletModal';
import { useState } from 'react';
import MoneyIcon from '@mui/icons-material/Money';

const roleToColor: Record<Role, string> = {
  Publisher: 'success',
  User: 'info',
  Admin: 'warning',
};

const Profile = () => {
  const { data: user } = useGetProfileQuery();
  const { data: wallet } = useGetWalletQuery();
  const [showTopUpWalletModal, setShowTopUpWalletModal] = useState(false);

  return (
    <Grid sx={{ maxWidth: 'md', margin: '0 auto', p: 2 }} container spacing={2}>
      <Grid size={12}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Avatar sx={{ backgroundColor: 'secondary.main' }}>
            {user?.userName?.charAt(0)}
          </Avatar>
          <Typography variant="h6" component="h2">
            Your Profile
          </Typography>
        </Stack>
      </Grid>
      <Grid size={6}>
        <Card sx={{ p: 3 }}>
          <Stack direction="column" spacing={3}>
            <Typography>
              <strong>Username</strong> {user?.userName}
            </Typography>
            <Typography>
              <strong>Email</strong> {user?.email}
            </Typography>
            <Typography>
              <strong>Country</strong> {user?.countryCode}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Roles</Typography>
              {user?.roles.map((role) => (
                <Chip
                  variant="outlined"
                  key={role}
                  label={role}
                  color={roleToColor[role]}
                />
              ))}
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid size={6}>
        <Card
          sx={{
            p: 3,
            height: '100%',
          }}
        >
          <Stack
            direction="column"
            spacing={3}
            sx={{ justifyContent: 'space-between', height: '100%' }}
          >
            <Stack direction="column" spacing={3}>
              <Typography sx={{ fontWeight: 'bold' }}>Balance</Typography>
              {wallet?.balances.map((balance) => (
                <Typography key={balance.currencyCode}>
                  {balance.availableAmount}{' '}
                  <strong>{balance.currencyCode}</strong>
                </Typography>
              ))}
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowTopUpWalletModal(true);
              }}
              startIcon={<MoneyIcon />}
            >
              Top Wallet
            </Button>
          </Stack>
        </Card>
      </Grid>
      <Grid size={12}>
        <Card sx={{ p: 3 }}>
          <Stack
            direction="column"
            spacing={3}
            sx={{ maxHeight: '200vh', overflow: 'auto' }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Transactions</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Balance After</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wallet?.entries.map((transaction) => (
                    <TableRow key={transaction.walletEntryId}>
                      <TableCell>{transaction.createdAt}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.balanceAfter}</TableCell>
                      <TableCell>{transaction.currencyCode}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Card>
      </Grid>
      <TopUpWalletModal
        open={showTopUpWalletModal}
        onClose={() => setShowTopUpWalletModal(false)}
      />
    </Grid>
  );
};

export default Profile;
