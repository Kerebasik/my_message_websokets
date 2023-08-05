import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { useTheme } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      {children}
      <ToastContainer
        position='bottom-right'
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
      />
    </>
  );
};

export default ToastProvider;
