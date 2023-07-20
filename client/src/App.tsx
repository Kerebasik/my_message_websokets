import React from 'react';
import { Theme } from './hoc/Theme';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import ToastProvider from './hoc/ToastifyProvider';
import {AuthProvider} from "./hoc/AuthProvider";

function App() {
  return (
      <AuthProvider>
        <Theme>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </Theme>
      </AuthProvider>
  );
}

export default App;
