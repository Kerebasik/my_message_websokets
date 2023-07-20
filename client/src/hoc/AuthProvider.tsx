import { createContext, useState } from 'react';
import {DeleteItemInLocalStorage, GetItemInLocalStorage} from "../components/services/localStorage";
import {LocalStorage} from "../enum/varibles";
import {useNavigate} from "react-router-dom";

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

export const AuthProvider = ({ children }: any) => {
    const navigator = useNavigate()
    const [auth, setAuth] = useState<boolean>(
        !!GetItemInLocalStorage(LocalStorage.accessToken)
    );

    const login = () => {
        setAuth(true);
        navigator('/')
    };

    const logout = () => {
        setAuth(false);
        DeleteItemInLocalStorage(LocalStorage.accessToken)
        navigator('/login')
    };

    const value: TAuthContextInitial = { auth, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};