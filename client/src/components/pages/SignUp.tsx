import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const navigator = useNavigate();

  const password = watch('password');
  const email = watch('email');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const handleOnSubmit: SubmitHandler<SignUpForm> = () => {
    new Promise(() => {
      console.log('send data', { email, password, confirmPassword });
    }).then(() => {
      reset();
    });
  };

  const handleNavigateInLogIn = () => {
    navigator('/login');
  };

  return (
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
            alignItems: 'center',
            minHeight: 300,
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant='h3'
            color='text.primary'
            component='h3'
            align={'center'}
          >
            Registration
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
                fullWidth
                value={field.value}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name={'password'}
            rules={{
              required: { value: true, message: 'Password is required' },
              minLength: { value: 6, message: 'Min length is 6 charters' },
              maxLength: { value: 20, message: 'Max length is 20 charters' },
              pattern: {
                value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                message: 'Password is not valid',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                error={!!fieldState.error}
                label='Password'
                type='password'
                fullWidth
                placeholder={'Password'}
                value={field.value}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name={'confirmPassword'}
            rules={{
              required: {
                value: true,
                message: 'Confirm password is required',
              },
              minLength: { value: 6, message: 'Min length is 6 charters' },
              maxLength: { value: 20, message: 'Max length is 20 charters' },
              pattern: {
                value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                message: 'Confirm password is not valid',
              },
              validate: (value) => value === password || 'Passwords must match',
            }}
            render={({ field, fieldState }) => (
              <TextField
                error={!!fieldState.error}
                label='Confirm password'
                type='password'
                fullWidth
                placeholder={'Confirm password'}
                value={field.value}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Button
            type='submit'
            variant='contained'
            fullWidth
            color='primary'
            sx={{
              fontSize: '16px',
              fontWeight: '700',
            }}
            formNoValidate
          >
            Sign up
          </Button>

          <Typography component={'p'} color={'text.primary'} align={'center'}>
            Do you have an account yet?{' '}
            <Link
              underline='hover'
              onClick={handleNavigateInLogIn}
              sx={{
                fontWeight: 700,
              }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
