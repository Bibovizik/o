import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useInitializeDataMutation } from '../../../store/api';

type InitializeDataFormValues = {
  testUserCount: number;
  maxPurchasesPerUser: number;
  maxReviewsPerUser: number;
};

const MAX_TEST_USER_COUNT = 500;
const MAX_PURCHASES_PER_USER = 25;
const MAX_REVIEWS_PER_USER = 15;

const DashboardInitilizeData = () => {
  const [initializeData, { isLoading: isInitializingData }] =
    useInitializeDataMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InitializeDataFormValues>({
    mode: 'onChange',
    defaultValues: {
      testUserCount: 200,
      maxPurchasesPerUser: 15,
      maxReviewsPerUser: 10,
    },
  });

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit((values) => initializeData(values))}
      container
      spacing={2}
      size={12}
    >
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <TextField
          label="Test users"
          type="number"
          fullWidth
          disabled={isInitializingData}
          error={!!errors.testUserCount}
          helperText={
            errors.testUserCount?.message ?? `Max ${MAX_TEST_USER_COUNT}`
          }
          slotProps={{ htmlInput: { min: 1, max: 500 } }}
          {...register('testUserCount', {
            valueAsNumber: true,
            required: 'Required',
            min: { value: 1, message: 'Min 1' },
            max: { value: 500, message: 'Max 500' },
          })}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <TextField
          label="Max purchases/user"
          type="number"
          fullWidth
          disabled={isInitializingData}
          error={!!errors.maxPurchasesPerUser}
          helperText={
            errors.maxPurchasesPerUser?.message ??
            `Max ${MAX_PURCHASES_PER_USER}`
          }
          slotProps={{ htmlInput: { min: 0, max: 25 } }}
          {...register('maxPurchasesPerUser', {
            valueAsNumber: true,
            required: 'Required',
            min: { value: 0, message: 'Min 0' },
            max: { value: 25, message: 'Max 25' },
          })}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <TextField
          label="Max reviews/user"
          type="number"
          fullWidth
          disabled={isInitializingData}
          error={!!errors.maxReviewsPerUser}
          helperText={
            errors.maxReviewsPerUser?.message ?? `Max ${MAX_REVIEWS_PER_USER}`
          }
          slotProps={{ htmlInput: { min: 0, max: 15 } }}
          {...register('maxReviewsPerUser', {
            valueAsNumber: true,
            required: 'Required',
            min: { value: 0, message: 'Min 0' },
            max: { value: 15, message: 'Max 15' },
          })}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 3 }}>
        <Button
          size="large"
          type="submit"
          fullWidth
          disabled={isInitializingData || !isValid}
          loading={isInitializingData}
          variant="contained"
          color="primary"
        >
          Initialize data
        </Button>
      </Grid>
    </Grid>
  );
};

export default DashboardInitilizeData;
