import React from 'react';
import { Theme } from './hoc/Theme';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import ToastifyProvider from "./hoc/ToastifyProvider";

function App() {
  return (
    <Theme>
        <ToastifyProvider>
            <RouterProvider router={router} />
        </ToastifyProvider>
    </Theme>
  );
}

export default App;
