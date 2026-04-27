import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Button,
  AppBar,
  Typography,
  Toolbar,
  Box,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import GamesIcon from '@mui/icons-material/Games';
import Logout from '@mui/icons-material/Logout';
import {
  useGetProfileQuery,
  useGetWalletQuery,
  useLogoutMutation,
} from '../store/api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';

const NavBar: React.FC = () => {
  const { data: user } = useGetProfileQuery();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout()
      .unwrap()
      .then(() => {
        navigate('/login');
      });
  };
  const { data: wallet } = useGetWalletQuery({}, { skip: !user });

  const navLinks = [
    { label: 'Store', icon: <StoreIcon />, path: '/' },
    {
      label: 'Library',
      icon: <GamesIcon />,
      path: '/library',
      hide: !user,
    },
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
      hide:
        !user ||
        !(user?.roles.includes('Admin') || user?.roles.includes('Publisher')),
    },
  ];

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            TOKITO
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {navLinks.map(({ label, icon, path, hide }) =>
              hide ? null : (
                <NavLink key={label} to={path} style={{ color: 'white' }}>
                  <Button
                    startIcon={icon}
                    color={pathname === path ? 'secondary' : 'inherit'}
                  >
                    {label}
                  </Button>
                </NavLink>
              ),
            )}
            {user && (
              <Avatar
                sx={{
                  backgroundColor:
                    pathname === '/profile' ? 'secondary.main' : 'white',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/profile')}
              >
                {user?.userName?.charAt(0)}
              </Avatar>
            )}
            <Typography variant="body1" color="warning">
              {wallet?.balances[0]?.availableAmount}{' '}
              {wallet?.balances[0]?.currencyCode}
            </Typography>
            {user ? (
              <IconButton onClick={handleLogout}>
                <Logout />
              </IconButton>
            ) : (
              <NavLink to="/login" style={{ color: 'white' }}>
                <Button startIcon={<LoginIcon />} color="inherit">
                  Login
                </Button>
              </NavLink>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
