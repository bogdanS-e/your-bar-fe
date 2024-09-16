import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIngredient } from 'api/ingredients';

const useCreateIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ingredients'],
      });
    },
  });
};

export default useCreateIngredient;
