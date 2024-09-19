import { useQuery } from '@tanstack/react-query';
import { getCocktails } from 'api/cocktails';

const useCocktails = () => {
  return useQuery({
    queryKey: ['cocktails'],
    queryFn: getCocktails,
  });
};

export default useCocktails;
