import { useState } from 'react';
import { createTheme, Theme } from '@mui/material';
import { StorageServiceInstance } from '../services/storageService';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CheckThemeInLocalStorage = (): Theme => {
  if (StorageServiceInstance.getItem('theme') === 'dark') {
    return darkTheme;
  }
  return lightTheme;
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(CheckThemeInLocalStorage());

  const handleThemeChange = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
    StorageServiceInstance.setItem(
      'theme',
      currentTheme === lightTheme ? 'dark' : 'light'
    );
  };

  return { currentTheme, handleThemeChange };
}
