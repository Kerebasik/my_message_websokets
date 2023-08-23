import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTRATION } from '../../graphql/mutation/auth';
import { toast } from 'react-toastify';
import {
  EmailValidation,
  FirstNameValidation,
  LastNameValidation,
  PasswordValidation,
  PhoneValidation,
} from '../../constants/validation';
import 'react-phone-input-2/lib/material.css';
import InputPhone from '../parts/PhoneInput/phoneInput';
import { SIGNUPREQUESTDELAY } from '../../constants/delay';
import { PublicRoutes } from '../../constants/routes';

interface SignUpForm {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
}

const SignUp = () => {
  const { control, handleSubmit, watch, reset } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
      phone: '',
      firstName: '',
      lastName: '',
    },
  });
  const navigator = useNavigate();
  const [RegisterUser] = useMutation(REGISTRATION);
  const password = watch('password');
  const email = watch('email');
  const phone = watch('phone');
  const firstName = watch('firstName');
  const lastName = watch('lastName');

  const handleOnSubmit: SubmitHandler<SignUpForm> = () => {
    RegisterUser({ variables: { email, firstName, lastName, password, phone } })
      .then(() => {
        toast.success('User was created', { autoClose: SIGNUPREQUESTDELAY });
        setTimeout(() => {
          navigator(PublicRoutes.LOGIN);
        }, SIGNUPREQUESTDELAY);
      })
      .catch(() => {
        toast.error('Server error');
      })
      .finally(() => {
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
            control={control}
            name={'firstName'}
            rules={FirstNameValidation}
            render={({ field, fieldState }) => (
              <TextField
                error={!!fieldState.error}
                label='First Name'
                type='text'
                fullWidth
                placeholder={'Your First Name'}
                value={field.value}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name={'lastName'}
            rules={LastNameValidation}
            render={({ field, fieldState }) => (
              <TextField
                error={!!fieldState.error}
                label='Last Name'
                type='text'
                fullWidth
                placeholder={'Your Last Name'}
                value={field.value}
                helperText={fieldState.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name='phone'
            control={control}
            rules={PhoneValidation}
            render={({ field: { onChange, value }, fieldState }) => (
              <>
                <InputPhone
                  value={value}
                  onChange={onChange}
                  error={!!fieldState.error?.message}
                />
              </>
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={EmailValidation}
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
            rules={PasswordValidation}
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
