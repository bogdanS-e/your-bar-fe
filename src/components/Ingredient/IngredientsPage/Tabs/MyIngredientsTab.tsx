import { useUser } from 'components/AuthHandler';
import { IIngredient, IngredientTag } from 'types/ingredient';
import Head from 'next/head';
import { useMemo } from 'react';
import useStore from 'store';
import Ingredients from '../Ingredients';

interface IMyIngredientsTabProps {
  initialData: IIngredient[];
  selectedTags: IngredientTag[];
}

const MyIngredientsTab = (props: IMyIngredientsTabProps) => {
  const { data: user } = useUser();
  const { getIngredientById } = useStore();

  const availableIngredients = useMemo(() => {
    if (!user) {
      return [];
    }

    const ingredients: IIngredient[] = [];
    for (const ingredientId of user.ingredients) {
      const ingredient = getIngredientById(ingredientId);

      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }, [user, getIngredientById]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>My Ingredients | Your Bar</title>
      </Head>
      <Ingredients
        {...props}
        ingredients={availableIngredients}
      />
    </>
  );
};

export default MyIngredientsTab;
