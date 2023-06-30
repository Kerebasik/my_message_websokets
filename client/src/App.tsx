import React, { useState } from 'react';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import {
  createTheme,
  Container,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import LightIcon from '@mui/icons-material/Brightness5Rounded';
import MoonIcon from '@mui/icons-material/Brightness4';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const handleThemeChange = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };
  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <Container
          maxWidth={'xl'}
          sx={{
            backgroundColor: 'background.default',
            height: '100vh',
          }}
        >
          <RouterProvider router={router} />
          <IconButton
            sx={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              zIndex: 1,
              margin: '20px',
            }}
            onClick={handleThemeChange}
            aria-label='delete'
            size='small'
          >
            {currentTheme === lightTheme ? <MoonIcon /> : <LightIcon />}
          </IconButton>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
