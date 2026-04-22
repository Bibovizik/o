import { useState } from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type SelectableReviewTagProps = {
  value: number | null;
  onChange: (rating: number) => void;
};

const SelectableReviewTag = ({ value, onChange }: SelectableReviewTagProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const preview = hovered ?? value;
  const filledUpTo = preview != null && preview > 0 ? preview : -1;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {preview ?? '—'} / 10
      </Typography>
      <Stack
        direction="row"
        spacing={0.25}
        component="span"
        onMouseLeave={() => setHovered(null)}
        sx={{ alignItems: 'center' }}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          const starValue = index + 1;
          const filled = index < filledUpTo;

          return (
            <IconButton
              key={index}
              size="small"
              aria-label={`Rate ${starValue} out of 10`}
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHovered(starValue)}
              sx={{ p: 0.25 }}
            >
              {filled ? (
                <StarIcon color="warning" fontSize="medium" />
              ) : (
                <StarBorderIcon color="inherit" fontSize="medium" />
              )}
            </IconButton>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SelectableReviewTag;
