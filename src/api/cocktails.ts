import { CocktailTag, ICocktail, ICocktailIngredient } from 'types/cocktail';
import axiosInstance from './axiosInstance';

export const getCocktails = async () => {
  const { data } = await axiosInstance.get<ICocktail[]>('/cocktails');

  return data;
};

export const getCocktail = async (slug: string) => {
  const { data } = await axiosInstance.get<ICocktail>(`/cocktail/${slug}`);

  return data;
};

export interface IIngredientParam extends Omit<ICocktailIngredient, 'value'> {
  value: number | string;
}

export interface ICreateCocktailParams {
  name: string;
  description: string;
  recipe: string;
  tags: CocktailTag[];
  image?: null | File;
  ingredients: IIngredientParam[];
}

const buildCocktailFormData = ({
  name,
  description,
  recipe,
  tags,
  image,
  ingredients,
}: ICreateCocktailParams) => {
  const formData = new FormData();

  for (const ingredient of ingredients) {
    ingredient.value = parseFloat(ingredient.value.toString());
  }

  formData.append('name', name);
  formData.append('description', description);
  formData.append('recipe', recipe);
  formData.append('tags', JSON.stringify(tags));
  formData.append('ingredients', JSON.stringify(ingredients));

  if (image) {
    formData.append('image', image);
  }

  return formData;
};

export const createCocktail = async (params: ICreateCocktailParams) => {
  const formData = buildCocktailFormData(params);

  const { data } = await axiosInstance.post<ICreateCocktailParams>('/cocktail/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const editCocktail = async (cocktailId: string, params: ICreateCocktailParams) => {
  const formData = buildCocktailFormData(params);

  const { data } = await axiosInstance.put<ICreateCocktailParams>(
    `/cocktail/edit/${cocktailId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};
