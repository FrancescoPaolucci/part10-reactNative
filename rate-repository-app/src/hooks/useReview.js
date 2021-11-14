import { useMutation } from '@apollo/client';

import { ADD_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(ADD_REVIEW, {
    onError: (error) => {
      console.log('MUTATION ERROR', error.graphQLErrors[0].message);
    },
  });
  const AddReview = async ({ repositoryName, ownerName, rating, text }) => {
    const resultMutation = await mutate({
      variables: {
        repositoryName: repositoryName,
        ownerName: ownerName,
        rating: Number(rating),
        text: text,
      },
    });

    return resultMutation;
  };

  return [AddReview, result];
};

export default useReview;
