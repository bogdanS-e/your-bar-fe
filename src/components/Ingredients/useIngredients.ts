import { useQuery } from '@tanstack/react-query';
import { IIngredient } from 'types/ingredient';
import axiosInstance from 'utils/axiosInstance';

export const getIngredients = async () => {
  const { data } = await axiosInstance.get<IIngredient[]>('/ingredients');

  return data;
};

const useIngredients = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
  });
};

export default useIngredients;
