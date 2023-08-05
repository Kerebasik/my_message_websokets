import { Container, IconButton, ThemeProvider } from '@mui/material';
import { lightTheme, useTheme } from '../hooks/useTheme';
import MoonIcon from '@mui/icons-material/Brightness4';
import LightIcon from '@mui/icons-material/Brightness5Rounded';
import React, {FC, PropsWithChildren} from 'react';

export const CustomTheme:FC<PropsWithChildren> = ({ children }) => {
  const { currentTheme, handleThemeChange } = useTheme();

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            backgroundColor: 'background.default',
            height: '100vh',
          }}
        >
          {children}
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
};
