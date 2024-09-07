import { useMutation } from "@tanstack/react-query";
import { IngredientTag } from "../../types/ingredient";

export interface IIngredientFormValues {
  name: string;
  description: string;
  tags: IngredientTag[];
  image?: File | null;
}

const submitIngredient = async ({ image, name, description, tags }: IIngredientFormValues) => {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  formData.append('tags', JSON.stringify(tags));

  if (image) {
    formData.append('image', image);
  }

  const response = await fetch('http://localhost:3001/v1/add-ingredient', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

const useCreateIngredient = () => {
  return useMutation({
    mutationFn: submitIngredient,
  });
};

export default useCreateIngredient;