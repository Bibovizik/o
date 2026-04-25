import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { FC } from 'react';
import type { PublishModalControlProps } from '../types';

const PublishGameNameField: FC<PublishModalControlProps> = ({ control }) => {
  return (
    <Controller
      name="name"
      control={control}
      rules={{ required: 'Name is required' }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          required
          fullWidth
          label="Name"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default PublishGameNameField;
