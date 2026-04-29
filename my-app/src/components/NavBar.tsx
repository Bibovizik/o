import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import GamesIcon from '@mui/icons-material/Games';
import {
  useGetProfileQuery,
  useGetWalletQuery,
  useLogoutMutation,
} from '../store/api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import NavBarLinks from './NavBarLinks';

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
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

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <NavBarLinks
                  onClose={() => setOpen(false)}
                  isMobile={isMobile}
                  navLinks={navLinks}
                  pathname={pathname}
                  user={user}
                  wallet={wallet}
                  onProfileClick={() => navigate('/profile')}
                  onLogout={handleLogout}
                />
              </Drawer>
            </>
          ) : (
            <NavBarLinks
              isMobile={isMobile}
              navLinks={navLinks}
              pathname={pathname}
              user={user}
              wallet={wallet}
              onProfileClick={() => navigate('/profile')}
              onLogout={handleLogout}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
