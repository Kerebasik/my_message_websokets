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
import {FetchResult, useMutation} from '@apollo/client';
import { REGISTRATION } from '../../mutation/auth';
import { toast } from 'react-toastify';
import {
    RegularValidationForEmail, RegularValidationForFirstName,
    RegularValidationForLastName,
    RegularValidationForPassword
} from '../../enum/validation';
import 'react-phone-input-2/lib/material.css';
import InputPhone from '../parts/PhoneInput/phoneInput';
import { SIGNUPREQUESTDELAY} from "../../enum/delay";
import {User} from "../../types/graphql";

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
      .then((res:FetchResult<User>) => {
          console.log('res', res.data)
        toast.success('User was created',{autoClose:SIGNUPREQUESTDELAY});
        setTimeout(() => {
          navigator('/login');
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
            rules={{
              required: { value: true, message: 'First Name is required' },
              pattern: {
                value: RegularValidationForFirstName,
                message: 'First Name is not valid',
              },
            }}
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
            rules={{
              required: { value: true, message: 'Last Name is required' },
              pattern: {
                value: RegularValidationForLastName,
                message: 'Last Name is not valid',
              },
            }}
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
            rules={{
              required: {
                value: true,
                message: 'Phone is required',
              },
            }}
            render={({ field: { onChange, value }, fieldState }) => (
              <>
                <InputPhone value={value} onChange={onChange} error={!!fieldState.error?.message} />
              </>
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: RegularValidationForEmail,
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
                value: RegularValidationForPassword,
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
