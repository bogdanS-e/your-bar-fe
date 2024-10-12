import { IUser } from 'types/user';
import axiosInstance from './axiosInstance';

//send token. BE will create a new user if not exist
export const getUser = async (token: string) => {
  const { data } = await axiosInstance.get<IUser>('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const addIngredientToUser = async (ingredientId: string, token: string) => {
  const { data } = await axiosInstance.post(`/user/ingredient/add/${ingredientId}`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteIngredientFromUser = async (ingredientId: string, token: string) => {
  const { data } = await axiosInstance.delete(`/user/ingredient/delete/${ingredientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const addFavoriteCocktailToUser = async (cocktailId: string, token: string) => {
  const { data } = await axiosInstance.post(
    `/user/favorite-cocktail/add/${cocktailId}`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteFavoriteCocktailFromUser = async (cocktailId: string, token: string) => {
  const { data } = await axiosInstance.delete(`/user/favorite-cocktail/delete/${cocktailId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
