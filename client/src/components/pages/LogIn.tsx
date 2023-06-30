import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Link,
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogInForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigator = useNavigate();
  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
    return () => reset();
  }, []);

  const handleNavigateInSignUp = () => {
    navigator('/signup');
  };

  const handleNavigateInResetPassword = () => {
    navigator('/reset-password');
  };

  const onSubmit: SubmitHandler<LogInForm> = () => {
    new Promise(() => {
      console.log('Send data', email, password);
    }).then(() => {
      reset();
    });
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
        onSubmit={handleSubmit(onSubmit)}
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
            Log in
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
                fullWidth
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
                fullWidth
                type='password'
                placeholder={'Password'}
                value={field.value}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Typography color={'text.primary'} align={'center'} component={'p'}>
            Forgot password? <Link underline={'hover'} sx={{fontWeight:700}} onClick={handleNavigateInResetPassword}>Recover password</Link>
          </Typography>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{
              fontSize: '16px',
              fontWeight: '700',
            }}
            formNoValidate
            fullWidth
          >
            Log in
          </Button>

          <Typography color={'text.primary'} align={'center'} component={'p'}>
            No account yet?{' '}
            <Link
              underline={'hover'}
              sx={{ fontWeight: 700 }}
              onClick={handleNavigateInSignUp}
            >
              {' '}
              Create an account
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
