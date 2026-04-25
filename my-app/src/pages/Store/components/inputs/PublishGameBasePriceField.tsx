import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { FC } from 'react';
import type { PublishModalControlProps } from '../types';

const PublishGameBasePriceField: FC<PublishModalControlProps> = ({
  control,
}) => {
  return (
    <Controller
      name="basePriceUah"
      control={control}
      rules={{ required: 'Price is required' }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          required
          type="number"
          fullWidth
          label="Price"
          slotProps={{ htmlInput: { min: 0, step: 'any' } }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default PublishGameBasePriceField;
