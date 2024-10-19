import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editIngredient, ICreateIngredientParams, revalidateIngredient } from 'api/ingredients';

const useEditIngredient = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (values: ICreateIngredientParams & { ingredientId: string }) => {
      const token = await getAccessTokenSilently();

      const res = await editIngredient({
        ...values,
        token,
      });

      await revalidateIngredient(res.slug);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ingredients'],
      });
    },
  });
};

export default useEditIngredient;
