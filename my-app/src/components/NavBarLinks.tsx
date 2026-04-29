import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MoneyIcon from '@mui/icons-material/Money';
import CloseIcon from '@mui/icons-material/Close';

type NavLinkItem = {
  label: string;
  icon: ReactNode;
  path: string;
  hide?: boolean;
};

type NavBarLinksProps = {
  isMobile: boolean;
  onClose?: () => void;
  navLinks: NavLinkItem[];
  pathname: string;
  user?: { userName?: string } | null;
  wallet?: {
    balances?: Array<{
      availableAmount?: string | number;
      currencyCode?: string;
    }>;
  } | null;
  onProfileClick: () => void;
  onLogout: () => void;
};

const NavBarLinks: FC<NavBarLinksProps> = ({
  isMobile,
  onClose,
  navLinks,
  pathname,
  user,
  wallet,
  onProfileClick,
  onLogout,
}) => {
  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={isMobile ? 4 : 2}
      sx={{
        alignItems: isMobile ? 'start' : 'center',
        padding: isMobile ? 4 : 0,
      }}
    >
      {isMobile && (
        <IconButton onClick={onClose} sx={{ alignSelf: 'end' }}>
          <CloseIcon />
        </IconButton>
      )}
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
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          {isMobile ? (
            <Button
              color={pathname === '/profile' ? 'secondary' : 'inherit'}
              onClick={onProfileClick}
              startIcon={
                <Avatar
                  sx={{
                    marginRight: 1,
                    backgroundColor:
                      pathname === '/profile' ? 'secondary.main' : 'white',
                    cursor: 'pointer',
                  }}
                  onClick={onProfileClick}
                >
                  {user?.userName?.charAt(0)}
                </Avatar>
              }
            >
              Profile
            </Button>
          ) : (
            <Avatar
              sx={{
                backgroundColor:
                  pathname === '/profile' ? 'secondary.main' : 'white',
                cursor: 'pointer',
              }}
              onClick={onProfileClick}
            >
              {user?.userName?.charAt(0)}
            </Avatar>
          )}
        </Stack>
      )}

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {isMobile && <MoneyIcon color="warning" />}
        <Typography variant="body1" color="warning">
          {wallet?.balances?.[0]?.availableAmount}{' '}
          {wallet?.balances?.[0]?.currencyCode}
        </Typography>
      </Stack>

      {user ? (
        <Stack direction="row" spacing={2} sx={{ alignSelf: 'end' }}>
          <IconButton onClick={onLogout}>
            <Logout />
          </IconButton>
        </Stack>
      ) : (
        <NavLink to="/login" style={{ color: 'white' }}>
          <Button startIcon={<LoginIcon />} color="inherit">
            Login
          </Button>
        </NavLink>
      )}
    </Stack>
  );
};

export default NavBarLinks;
