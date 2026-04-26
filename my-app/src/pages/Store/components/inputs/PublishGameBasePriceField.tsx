import { Controller } from 'react-hook-form';
import {
  AccordionSummary,
  Typography,
  Stack,
  TextField,
  AccordionDetails,
  Accordion,
  InputAdornment,
} from '@mui/material';
import type { FC } from 'react';
import type { PublishModalControlProps } from '../types';
import AddIcon from '@mui/icons-material/Add';
import currencies from '../../currencies';

const PublishGameBasePriceField: FC<PublishModalControlProps> = ({
  control,
}) => {
  return (
    <Stack>
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">UAH</InputAdornment>
                ),
              },
              htmlInput: { min: 0, step: 'any' },
            }}
            label="Base Price"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Accordion>
        <AccordionSummary expandIcon={<AddIcon />}>
          <Typography>Add local prices</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column" spacing={2}>
            {currencies.map((currency) => (
              <Controller
                key={currency.marketCode}
                name={`priceOverrides.${currency.marketCode}`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    key={currency.marketCode}
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            {currency.marketCode}
                          </InputAdornment>
                        ),
                      },
                      htmlInput: { min: 0, step: 'any' },
                    }}
                    label={currency.name}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default PublishGameBasePriceField;
