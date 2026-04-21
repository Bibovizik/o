import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Button,
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Box,
  Stack,
} from '@mui/material';

const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tokito
          </Typography>
          <NavLink to="/">
            <Button>Store</Button>
          </NavLink>
          <NavLink to="/library">
            <Button>Library</Button>
          </NavLink>
          <NavLink to="/login">
            <Button color="inherit">Login</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
