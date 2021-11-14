import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from './useSignIn';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn, signInResult] = useSignIn();

  const register = async ({ username, password }) => {
    const result = await mutate({
      variables: {
        username,
        password,
      },
    });

    if (result.data) {
      await signIn({ username, password });
    }
  };

  return [register, result, signInResult];
};

export default useSignUp;
