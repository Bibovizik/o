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
        minWidth: 0,
        borderLeftColor: 'primary.main',
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
        maxHeight: '200px',
      }}
    >
      <Stack spacing={1} sx={{ minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: '100',
            color: 'primary.main',
          }}
        >
          About this game
        </Typography>
        <Typography
          variant="body1"
          sx={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description ?? ''}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default GameDescription;
