import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
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
import { useLogoutMutation } from '../store/api';

const NavBar: React.FC = () => {
  const { user } = useAuth();

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
            <NavLink to="/" style={{ color: 'white' }}>
              <Button
                startIcon={<StoreIcon />}
                color={pathname === '/' ? 'secondary' : 'inherit'}
              >
                Store
              </Button>
            </NavLink>
            <NavLink to="/library" style={{ color: 'white' }}>
              <Button
                startIcon={<GamesIcon />}
                color={pathname === '/library' ? 'secondary' : 'inherit'}
              >
                Library
              </Button>
            </NavLink>
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
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
