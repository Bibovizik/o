import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/api';
import {
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  Stack,
  Divider,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    await login({ email, password })
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ p: 3 }}>
        <Button
          color="secondary"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          To Store
        </Button>
        <Stack
          direction="column"
          spacing={3}
          sx={{ alignItems: 'center', p: 3, width: '350px' }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            TOKITO
          </Typography>
          <Typography variant="body1">Welcome to my cool store</Typography>
          <Divider sx={{ width: '100%', backgroundColor: 'white' }} />
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            loading={isLoading}
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              {/* @ts-expect-error - error is not typed */}
              {error.data?.message ?? 'An error occurred.'}
            </Typography>
          )}
          <Typography variant="body1">
            Don't have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Grid>
  );
};

export default Login;
