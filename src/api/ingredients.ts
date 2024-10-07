import { IIngredient, IngredientTag } from 'types/ingredient';
import axiosInstance from './axiosInstance';

export const getIngredients = async (token?: string) => {
  const { data } = await axiosInstance.get<IIngredient[]>('/ingredients', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getIngredient = async (slug: string) => {
  const { data } = await axiosInstance.get<IIngredient>(`/ingredient/${slug}`);

  return data;
};

export interface ICreateIngredientParams {
  name: string;
  description: string;
  tags: IngredientTag[];
  image?: File | null;
}

export const createIngredient = async (params: ICreateIngredientParams, token: string) => {
  const { image, name, description, tags } = params;
  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  formData.append('tags', JSON.stringify(tags));

  if (image) {
    formData.append('image', image);
  }

  const { data } = await axiosInstance.post<ICreateIngredientParams>('/add-ingredient', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
