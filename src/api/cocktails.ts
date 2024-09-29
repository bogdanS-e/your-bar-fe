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

interface IIngredientParams extends Omit<ICocktailIngredient, 'value'> {
  name: string;
  value: number | string;
}

export interface ICreateCocktailParams {
  name: string;
  description: string;
  recipe: string;
  tags: CocktailTag[];
  image?: null | File;
  ingredients: IIngredientParams[];
}

export const createCocktail = async ({
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

  const { data } = await axiosInstance.post<ICreateCocktailParams>(
    '/add-cocktail',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};
