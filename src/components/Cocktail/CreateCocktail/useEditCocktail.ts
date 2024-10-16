import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCocktail, ICreateCocktailParams, revalidateCocktail } from 'api/cocktails';

const useEditCocktail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ICreateCocktailParams & { cocktailId: string }) => {
      const res = await editCocktail(values.cocktailId, values);

      await revalidateCocktail(res.slug);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cocktails'],
      });
    },
  });
};

export default useEditCocktail;
