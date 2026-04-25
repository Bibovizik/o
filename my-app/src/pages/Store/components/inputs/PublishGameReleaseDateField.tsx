import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { FC } from 'react';
import type { PublishModalControlProps } from '../types';

const PublishGameReleaseDateField: FC<PublishModalControlProps> = ({
  control,
}) => {
  return (
    <Controller
      name="releaseDate"
      control={control}
      rules={{ required: 'Release date is required' }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          required
          type="date"
          fullWidth
          label="Release Date"
          slotProps={{ inputLabel: { shrink: true } }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default PublishGameReleaseDateField;
