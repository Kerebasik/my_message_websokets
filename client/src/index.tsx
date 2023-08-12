import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {StorageServiceInstance} from "./services/storageService";
import {LocalStorage} from "./constants/varibles";

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_API_URL}/graphql`
})

const authLink = setContext((_,{headers})=>{
    const accessToken = StorageServiceInstance.getItem(LocalStorage.accessToken)
    return{
        headers:{
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
