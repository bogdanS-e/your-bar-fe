import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteIngredient } from 'api/ingredients';

const useDeleteIngredient = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (ingredientId: string) => {
      const token = await getAccessTokenSilently();
      await deleteIngredient(ingredientId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ingredients'],
      });
    },
  });
};

export default useDeleteIngredient;
