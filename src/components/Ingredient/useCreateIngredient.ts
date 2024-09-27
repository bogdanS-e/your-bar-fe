import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIngredient, ICreateIngredientParams } from 'api/ingredients';

const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (values: ICreateIngredientParams) => {
      const accessToken = await getAccessTokenSilently();

      return await createIngredient(values, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ingredients'],
      });
    },
  });
};

export default useCreateIngredient;
