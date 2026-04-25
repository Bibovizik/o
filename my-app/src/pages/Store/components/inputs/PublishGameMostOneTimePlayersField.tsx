import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { FC } from 'react';
import type { PublishModalControlProps } from '../types';

const PublishGameMostOneTimePlayersField: FC<PublishModalControlProps> = ({
  control,
}) => {
  return (
    <Controller
      name="mostOneTimePlayers"
      control={control}
      rules={{ required: 'Most one time players is required' }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          required
          type="number"
          fullWidth
          label="Most One Time Players"
          slotProps={{ htmlInput: { min: 0, step: 1 } }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default PublishGameMostOneTimePlayersField;
