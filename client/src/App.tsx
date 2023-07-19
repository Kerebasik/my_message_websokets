import React from 'react';
import { Theme } from './hoc/Theme';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import ToastProvider from './hoc/ToastifyProvider';

function App() {
  return (
    <Theme>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Theme>
  );
}

export default App;
