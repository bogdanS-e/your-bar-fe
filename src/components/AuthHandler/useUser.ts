import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from 'api/user';

const useUser = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();

      return await getUser(accessToken);
    },
    enabled: isAuthenticated,
  });
};

export default useUser;
