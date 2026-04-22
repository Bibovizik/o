import { Paper, Stack, Typography } from '@mui/material';

type GameDescriptionProps = {
  description?: string | null;
};

const GameDescription = ({ description }: GameDescriptionProps) => {
  return (
    <Paper
      elevation={10}
      sx={{
        p: 2,
        borderLeftColor: 'primary.main',
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
      }}
    >
      <Stack spacing={1}>
        <Typography
          variant="body1"
          sx={{ fontWeight: '100', color: 'primary.main' }}
        >
          About this game
        </Typography>
        <Typography variant="body1">{description ?? ''}</Typography>
      </Stack>
    </Paper>
  );
};

export default GameDescription;
