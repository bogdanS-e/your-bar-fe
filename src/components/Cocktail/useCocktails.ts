import { useQuery } from '@tanstack/react-query';
import { ICocktail } from 'types/cocktail';
import axiosInstance from 'utils/axiosInstance';

export const getCocktails = async () => {
  const { data } = await axiosInstance.get<ICocktail[]>('/cocktails');

  return data;
};

const useCocktails = () => {
  return useQuery({
    queryKey: ['cocktails'],
    queryFn: getCocktails,
  });
};

export default useCocktails;
