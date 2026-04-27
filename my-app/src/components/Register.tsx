import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  useGetCountryCodeQuery,
  useLoginMutation,
  useRegisterMutation,
} from '../store/api';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Register = () => {
  const [isPublisher, setIsPublisher] = useState(false);
  const [username, setUsername] = useState('');
  const [publisherName, setPublisherName] = useState('');
  const [publisherWebsite, setPublisherWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [register, { isLoading, error }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const { data: country } = useGetCountryCodeQuery();

  const handleRegister = async () => {
    await register({
      isPublisher: isPublisher,
      userNickname: username,
      email,
      password,
      countryCode: country ?? 'CZ',
      ...(isPublisher
        ? {
            publisherName,
            website: publisherWebsite,
          }
        : {}),
    })
      .unwrap()
      .then(async () => {
        await login({ email, password })
          .unwrap()
          .then(() => {
            navigate('/');
          });
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
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <FormControlLabel
            control={
              <Switch
                checked={isPublisher}
                onChange={(e) => setIsPublisher(e.target.checked)}
              />
            }
            label="I am a publisher"
          />
          {isPublisher && (
            <>
              <TextField
                fullWidth
                label="Publisher name"
                value={publisherName}
                onChange={(e) => setPublisherName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Publisher website"
                value={publisherWebsite}
                onChange={(e) => setPublisherWebsite(e.target.value)}
              />
            </>
          )}

          <Button
            loading={isLoading || isLoginLoading}
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              {/* @ts-expect-error - error is not typed */}
              {error.data?.message ?? 'An error occurred.'}
            </Typography>
          )}
          <Typography variant="body1">
            Already have Tokito account?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Grid>
  );
};

export default Register;
