import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getIngredients } from 'api/ingredients';

const useIngredients = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
  });
};

export default useIngredients;
