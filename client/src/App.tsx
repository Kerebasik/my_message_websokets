import React, {useEffect} from 'react';
import { CustomTheme } from './hoc/CustomTheme';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import ToastProvider from './hoc/ToastifyProvider';
import {AuthProvider} from "./hoc/AuthProvider";
import {useQuery} from "@apollo/client";
import UserQuery from './guery/User'
import {StorageServiceInstance } from './services/storageService';
import {LocalStorage} from "./constants/varibles";

function App() {
    const {data, error} = useQuery(UserQuery.GET_USER_BY_ACCESS_TOKEN)

    useEffect(()=>{
        if(!!data){
            console.log(data.getUserById)
        }
    },[data])

    useEffect(()=>{
        if(!!error){
            StorageServiceInstance.deleteItem(LocalStorage.accessToken)
        }
    },[error])

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
