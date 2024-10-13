import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCocktail, ICreateCocktailParams } from 'api/cocktails';

const useEditCocktail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ICreateCocktailParams & { cocktailId: string }) =>
      await editCocktail(values.cocktailId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cocktails'],
      });
    },
  });
};

export default useEditCocktail;
