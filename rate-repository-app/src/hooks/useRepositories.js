import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, searchKeyword, first }) => {
  const variables = {};

  if (orderBy === 'latest') {
    variables.orderBy = 'CREATED_AT';
    variables.orderDirection = 'DESC';
    variables.searchKeyword = searchKeyword;
    variables.first = first;
  } else if (orderBy === 'highest') {
    variables.orderBy = 'RATING_AVERAGE';
    variables.orderDirection = 'DESC';
    variables.searchKeyword = searchKeyword;
    variables.first = first;
  } else if (orderBy === 'lowest') {
    variables.orderBy = 'RATING_AVERAGE';
    variables.orderDirection = 'ASC';
    variables.searchKeyword = searchKeyword;
    variables.first = first;
  }

  console.log(variables.orderBy);
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    console.log(data?.repositories.pageInfo.hasNextPage);
    if (!canFetchMore) {
      console.log('cant fetch more');
      return;
    }
    console.log('fetch more cllaed');
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
