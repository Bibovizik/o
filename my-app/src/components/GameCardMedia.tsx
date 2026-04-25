import type { FC } from 'react';
import { CardMedia } from '@mui/material';
import { gameImagePlaceholder } from '../icons/NoImage';

export interface GameCardMediaProps {
  src: string;
  alt: string;
}

const GameCardMedia: FC<GameCardMediaProps> = ({ src, alt }) => (
  <CardMedia
    component="img"
    image={src}
    alt={alt}
    onError={(e) => {
      const el = e.currentTarget;
      if (el.dataset.placeholder === '1') return;
      el.dataset.placeholder = '1';
      el.src = gameImagePlaceholder;
    }}
    sx={{
      borderRadius: 2,
      height: '400px',
      objectFit: 'cover',
    }}
  />
);

export default GameCardMedia;
