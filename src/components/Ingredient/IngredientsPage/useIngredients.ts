import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { getIngredients } from 'api/ingredients';

const useIngredients = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  return useQuery({
    queryKey: ['ingredients', isAuthenticated],
    queryFn: async () => {
      console.log('isAuthenticated', isAuthenticated);

      const accessToken = isAuthenticated ? await getAccessTokenSilently() : undefined;

      return await getIngredients(accessToken);
    },
    enabled: !isLoading,
  });
};

export default useIngredients;
