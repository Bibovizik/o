import { Controller } from 'react-hook-form';
import { Input, Typography } from '@mui/material';
import type { FC } from 'react';
import type { PublishModalControlProps } from '../types';

export interface PublishGameCoverImageFieldProps
  extends PublishModalControlProps {
  /** When false, leaving the file empty is valid (e.g. edit game, keep existing cover) */
  requireImage?: boolean;
}

const PublishGameCoverImageField: FC<PublishGameCoverImageFieldProps> = ({
  control,
  requireImage = true,
}) => {
  return (
    <Controller
      name="image"
      control={control}
      rules={requireImage ? { required: 'Cover image is required' } : {}}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <>
          <Input
            required={requireImage}
            type="file"
            fullWidth
            name={name}
            onBlur={onBlur}
            inputRef={ref}
            onChange={(e) => {
              const input = e.target as HTMLInputElement;
              onChange(input.files?.[0]);
            }}
            inputProps={{ accept: 'image/*' }}
          />
          {fieldState.error && (
            <Typography variant="caption" color="error">
              {fieldState.error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default PublishGameCoverImageField;
