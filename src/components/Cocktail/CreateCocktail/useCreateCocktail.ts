import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCocktail } from 'api/cocktails';

const useCreateCocktail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCocktail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cocktails'],
      });
    },
  });
};

export default useCreateCocktail;
