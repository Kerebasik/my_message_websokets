import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ChannelAndGroupDescriptionValidation,
  ChannelAndGroupNameValidation,
} from '../../constants/validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../constants/routes';
import {useCreateChannel} from "../../hooks/mutation/useCreateChannel";

export type CreateChannelForm = {
  name: string;
  description: string;
};

const CreateChannel = () => {
  const { control, handleSubmit, watch, reset } = useForm<CreateChannelForm>({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const name = watch('name');
  const description = watch('description');
  const navigate = useNavigate();
  const {createChannel}=useCreateChannel()

  const onSubmit: SubmitHandler<CreateChannelForm> = () => {
    createChannel({name, description})
      .then(() => {
        toast.success('Channel created', { autoClose: 2000 });
        navigate(PrivateRoutes.ROOT);
      })
      .catch(() => {
        toast.error('Failed create channel', { autoClose: 2000 });
      })
      .finally(() => {
        reset();
      });
  };

  return(
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
            Create Channel
          </Typography>
          <Controller
            name='name'
            control={control}
            rules={ChannelAndGroupNameValidation}
            render={({ field, fieldState }) => (
              <TextField
                error={!!fieldState.error}
                label='Name'
                placeholder={'Name'}
                type='text'
                value={field.value}
                fullWidth
                helperText={fieldState.error?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name={'description'}
            rules={ChannelAndGroupDescriptionValidation}
            render={({ field, fieldState }) => (
              <TextField
                error={!!fieldState.error}
                label='Description'
                fullWidth
                multiline
                type='text'
                rows={5}
                placeholder={'Description'}
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
            fullWidth
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export { CreateChannel };
