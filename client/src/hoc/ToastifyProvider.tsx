import {FC, PropsWithChildren} from "react";
import { ToastContainer } from 'react-toastify';
import {useTheme} from "@mui/material";

const ToastifyProvider:FC<PropsWithChildren> = ({children}) => {
  const theme = useTheme()
    return(
      <>
          {children}
          <ToastContainer
              position="bottom-right"
              autoClose={5000}
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
  )
}

export default ToastifyProvider