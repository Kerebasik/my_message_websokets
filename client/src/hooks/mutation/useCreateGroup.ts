import { useMutation } from '@apollo/client';
import { CREATE_GROUP } from '../../graphql/mutation/group';
import { CreateGroupForm } from '../../components/pages/CreateGroup';

const useCreateGroup = () => {
  const [CreateGroup, { loading, error }] = useMutation(CREATE_GROUP);

  const createGroup = async ({ name, description }: CreateGroupForm) => {
    const data = await CreateGroup({
      variables: { group_name: name, description: description },
    });

    return data;
  };

  return { createGroup, loading, error };
};

export { useCreateGroup };
