import { Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type ReviewTagProps = {
  rating?: number | null;
};

const ReviewTag = ({ rating }: ReviewTagProps) => {
  const filledUpTo = rating != null ? rating : -1;

  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {rating} / 10
      </Typography>
      {Array.from({ length: 10 }).map((_, index) =>
        index < filledUpTo ? (
          <StarIcon key={index} color="warning" />
        ) : (
          <StarBorderIcon key={index} color="inherit" />
        ),
      )}
    </Stack>
  );
};

export default ReviewTag;
