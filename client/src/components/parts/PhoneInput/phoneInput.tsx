import { FC } from 'react';
import PhoneInput from 'react-phone-input-2';
import './phoneInput.style.css';
import { useTheme } from '@mui/material';
import { ChangeEvent } from 'react';

interface InputPhoneProps {
  value?: string;
  onChange?: (event: string | ChangeEvent<Element>) => void;
  error?: boolean;
}

const InputPhone: FC<InputPhoneProps> = ({ value, onChange, error }) => {
  const theme = useTheme();

  return (
    <>
      <PhoneInput
        isValid={!error}
        inputStyle={{
          borderColor: error
            ? theme.palette.error.main
            : theme.palette.action.disabled,
          color: theme.palette.text.primary,
        }}
        dropdownStyle={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
        }}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputPhone;
