import { IIngredient, IngredientTag } from 'types/ingredient';
import axiosInstance from './axiosInstance';
import axios from 'axios';

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

interface IEditIngredientParams extends ICreateIngredientParams {
  ingredientId: string;
  token: string;
}

const buildIngredientFormData = ({ name, description, tags, image }: ICreateIngredientParams) => {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  formData.append('tags', JSON.stringify(tags));

  if (image) {
    formData.append('image', image);
  }

  return formData;
};

export const createIngredient = async (params: ICreateIngredientParams, token: string) => {
  const formData = buildIngredientFormData(params);

  const { data } = await axiosInstance.post<ICreateIngredientParams>('/ingredient/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const editIngredient = async (params: IEditIngredientParams) => {
  const formData = buildIngredientFormData(params);
  const { token, ingredientId } = params;

  const { data } = await axiosInstance.put<IIngredient>(
    `/ingredient/edit/${ingredientId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteIngredient = async (ingredientId: string, token: string) => {
  const { data } = await axiosInstance.delete(`/ingredient/delete/${ingredientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const revalidateIngredient = async (slug: string) => {
  const { data } = await axios.get(`/api/revalidate-ingredient?slug=${slug}`);

  return data;
};
