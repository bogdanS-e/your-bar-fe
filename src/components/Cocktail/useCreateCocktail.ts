import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { CocktailTag, ICocktailIngredient } from 'types/cocktail';

interface ICocktailIngredientFormValues extends Omit<ICocktailIngredient, 'value'> {
  name: string;
  value: number | string;
}

export interface ICocktailFormValues {
  name: string;
  description: string;
  recipe: string;
  tags: CocktailTag[];
  image?: null | File;
  ingredients: ICocktailIngredientFormValues[];
}

const submitCocktail = async ({
  name,
  description,
  recipe,
  tags,
  image,
  ingredients,
}: ICocktailFormValues) => {
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

  const { data } = await axiosInstance.post<ICocktailFormValues>(
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

const useCreateCocktail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitCocktail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cocktails'],
      });
    },
  });
};

export default useCreateCocktail;
