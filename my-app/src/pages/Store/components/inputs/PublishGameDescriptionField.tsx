import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { PUBLISH_GAME_DESCRIPTION_MAX_LENGTH } from '../../../../types/Game';
import type { PublishModalControlProps } from '../types';
import type { FC } from 'react';

const PublishGameDescriptionField: FC<PublishModalControlProps> = ({
  control,
}) => {
  return (
    <Controller
      name="description"
      control={control}
      rules={{
        required: 'Description is required',
        maxLength: {
          value: PUBLISH_GAME_DESCRIPTION_MAX_LENGTH,
          message: `Description must be at most ${PUBLISH_GAME_DESCRIPTION_MAX_LENGTH} characters`,
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          required
          multiline
          rows={4}
          fullWidth
          label="Description"
          error={!!fieldState.error}
          helperText={
            fieldState.error?.message ??
            `${field.value.length}/${PUBLISH_GAME_DESCRIPTION_MAX_LENGTH}`
          }
          slotProps={{
            htmlInput: { maxLength: PUBLISH_GAME_DESCRIPTION_MAX_LENGTH },
          }}
        />
      )}
    />
  );
};

export default PublishGameDescriptionField;
