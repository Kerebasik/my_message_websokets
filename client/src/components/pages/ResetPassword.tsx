import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';

interface ResetPasswordFrom {
  email: string;
}

export const ResetPassword = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: { email: '' },
  });
  const email = watch('email');

  const handleOnSubmit: SubmitHandler<ResetPasswordFrom> = () => {
    new Promise(() => {
      console.log('send data', email);
    }).then(() => {
      reset();
    });
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <>
      <Container maxWidth='sm'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
          component='form'
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              backgroundColor: 'divider',
              padding: '20px',
              gap: '20px',
              border: '1px solid',
              borderColor: 'text.primary',
              borderRadius: '15px',
              justifyContent: 'center',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant='h3'
              color='text.primary'
              component='h3'
              align={'center'}
              sx={{
                fontSize: '32px',
                fontWeight: 700,
              }}
            >
              Reset Password
            </Typography>
            <Controller
              name='email'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email is not valid',
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  error={!!fieldState.error}
                  label='Email'
                  placeholder={'Email'}
                  type='email'
                  value={field.value}
                  helperText={fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{
                fontSize: '16px',
                fontWeight: '700',
              }}
              formNoValidate
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
