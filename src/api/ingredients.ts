import { IIngredient, IngredientTag } from 'types/ingredient';
import axiosInstance from './axiosInstance';

export const getIngredients = async () => {
  const { data } = await axiosInstance.get<IIngredient[]>('/ingredients');

  return data;
};

export const getIngredient = async (id: string) => {
  const { data } = await axiosInstance.get<IIngredient>(`/ingredient/${id}`);

  return data;
};

export interface ICreateIngredientParams {
  name: string;
  description: string;
  tags: IngredientTag[];
  image?: File | null;
}

export const createIngredient = async ({
  image,
  name,
  description,
  tags,
}: ICreateIngredientParams) => {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  formData.append('tags', JSON.stringify(tags));

  if (image) {
    formData.append('image', image);
  }

  const { data } = await axiosInstance.post<ICreateIngredientParams>(
    '/add-ingredient',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};
