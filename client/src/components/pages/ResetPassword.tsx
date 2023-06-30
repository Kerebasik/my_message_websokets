import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ResetPasswordFrom {
  email: string;
}

export const ResetPassword = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: { email: '' },
  });
  const navigate = useNavigate()
  const email = watch('email');

  const handleOnSubmit: SubmitHandler<ResetPasswordFrom> = () => {
    new Promise(() => {
      console.log('send data', email);
    }).then(() => {
      reset();
    });
  };

  const handleNavigateInLogIn=()=>{
    navigate('/login')
  }

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
              alignItems:'center',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant='h3'
              color='text.primary'
              component='h1'
              align={'center'}
              sx={{
                fontSize: '32px',
                fontWeight: 700,
              }}
            >
              Reset password
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
                  fullWidth
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
              fullWidth
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
            <Typography color={'text.primary'} align={'center'} component={'p'}>
              Remember the password? <Link underline={'hover'} onClick={handleNavigateInLogIn} sx={{fontWeight:700}}>Log in</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};
