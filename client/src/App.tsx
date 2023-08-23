import React from 'react';
import { CustomTheme } from './hoc/CustomTheme';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import ToastProvider from './hoc/ToastifyProvider';
import { AuthProvider } from './hoc/AuthProvider';
import { useInitialUser } from './hooks/query/useInitialUser';

function App() {
  useInitialUser();

  return (
    <AuthProvider>
      <CustomTheme>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </CustomTheme>
    </AuthProvider>
  );
}

export default App;
