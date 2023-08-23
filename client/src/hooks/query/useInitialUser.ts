import { useQuery } from '@apollo/client';
import { GET_USER_BY_ACCESS_TOKEN } from '../../graphql/query/User';
import { useEffect } from 'react';
import { StorageServiceInstance } from '../../services/storageService';
import { LocalStorage } from '../../constants/varibles';

const useInitialUser = () => {
  const { data, error } = useQuery(GET_USER_BY_ACCESS_TOKEN);

  useEffect(() => {
    if (!!data) {
      console.log(data.getUserById);
    }
  }, [data]);

  useEffect(() => {
    if (!!error) {
      StorageServiceInstance.deleteItem(LocalStorage.accessToken);
    }
  }, [error]);
  return { useInitialUser };
};

export { useInitialUser };
