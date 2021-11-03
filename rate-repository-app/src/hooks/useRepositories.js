import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  const reporesult = useQuery(GET_REPOSITORIES, {
    nextFetchPolicy: 'cache-first', // Used for subsequent executions
  });

  const fetchRepositories = async () => {
    if (reporesult.loading) {
      setLoading(true);
      console.log('loading');
    }
    // Replace the IP address part with your own IP address!
    setLoading(false);
    setRepositories(reporesult.data.repositories);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
