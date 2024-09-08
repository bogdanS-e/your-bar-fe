import { useMutation } from '@tanstack/react-query';
import { IngredientTag } from '../../types/ingredient';
import axiosInstance from 'utils/axiosInstance';

export interface IIngredientFormValues {
  name: string;
  description: string;
  tags: IngredientTag[];
  image?: File | null;
}

const submitIngredient = async ({
  image,
  name,
  description,
  tags,
}: IIngredientFormValues) => {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  formData.append('tags', JSON.stringify(tags));

  if (image) {
    formData.append('image', image);
  }

  const { data } = await axiosInstance.post<IIngredientFormValues>('/add-ingredient', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  return data;
};

const useCreateIngredient = () => {
  return useMutation({
    mutationFn: submitIngredient,
  });
};

export default useCreateIngredient;
