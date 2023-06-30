import React  from 'react';
import { Theme } from './hoc/Theme';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';

function App() {

  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;
