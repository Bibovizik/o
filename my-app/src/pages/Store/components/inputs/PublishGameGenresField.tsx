import { Controller } from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import type { FC } from 'react';
import { useGetGenresQuery } from '../../../../store/api';
import type { PublishModalControlProps } from '../types';

const PublishGameGenresField: FC<PublishModalControlProps> = ({ control }) => {
  const { data: genres } = useGetGenresQuery();

  return (
    <Controller
      control={control}
      name="genreIds"
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="publish-game-genres-label">Genres</InputLabel>
          <Select<number[]>
            multiple
            value={field.value}
            onChange={(e) => {
              const value = e.target.value as number[] | string[];
              field.onChange(
                (value as Array<string | number>).map((v) =>
                  typeof v === 'number' ? v : Number(v),
                ),
              );
            }}
            input={<OutlinedInput label="Genres" />}
            renderValue={(selected) => {
              const ids = selected as number[];
              const labels =
                genres
                  ?.filter((g) => ids.includes(g.genreId))
                  .map((g) => g.name) ?? [];
              return labels.join(', ');
            }}
          >
            {genres?.map((genre) => (
              <MenuItem key={genre.genreId} value={genre.genreId}>
                <Checkbox checked={field.value.includes(genre.genreId)} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default PublishGameGenresField;
