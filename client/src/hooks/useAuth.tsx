
import { useContext } from 'react';
import { AuthContext, TAuthContextInitial } from '../hoc/AuthProvider';

export function useAuth() {
    return useContext<TAuthContextInitial>(AuthContext);
}