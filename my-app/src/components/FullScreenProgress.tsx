import { Box, CircularProgress } from '@mui/material';

const FullScreenProgress = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '100vw',
    }}
  >
    <CircularProgress />
  </Box>
);

export default FullScreenProgress;
