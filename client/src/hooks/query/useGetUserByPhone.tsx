import { useLazyQuery } from '@apollo/client';
import { GET_USER_SEARCH } from '../../graphql/query/User';
import { User } from '../../types/graphql';

const useGetUserByPhone = () => {
  const [GetUserByPhone, { loading }] = useLazyQuery(GET_USER_SEARCH);

  const getUserByPhone = async (search: string): Promise<User | undefined> => {
    try {
      const data = await GetUserByPhone({ variables: { search } });
      return data?.data?.getUserByPhone;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return { getUserByPhone, loading };
};

export { useGetUserByPhone };
