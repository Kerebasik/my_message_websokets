import { createContext, FC, ReactNode, useState } from 'react';
import { StorageServiceInstance } from '../services/storageService';
import { LocalStorage } from '../constants/varibles';

export type TAuthContextInitial = {
  auth: boolean;
  login: Function;
  logout: Function;
};

const initialContext: TAuthContextInitial = {
  auth: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<TAuthContextInitial>(initialContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(
    !!StorageServiceInstance.getItem(LocalStorage.accessToken)
  );

  const login = () => {
    setAuth(true);
  };

  const logout = () => {
    setAuth(false);
    StorageServiceInstance.deleteItem(LocalStorage.accessToken);
  };

  const value: TAuthContextInitial = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
