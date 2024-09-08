import { GetStaticProps } from 'next';

import { IIngredient } from 'types/ingredient';

import IngredientsPage from 'components/Ingredients';
import { getIngredients } from 'components/Ingredients/useIngredients';

interface IIngredientsProps {
  initialData: IIngredient[] ;
}

const Ingredients = ({ initialData }: IIngredientsProps) => (
  <IngredientsPage initialData={initialData} />
);

export default Ingredients;

export const getStaticProps: GetStaticProps<IIngredientsProps> = async () => {
  const ingredients = await getIngredients()

  return {
    props: {
      initialData: ingredients,
    },
    revalidate: 24 * 60 * 60 * 1000, // 1 day
  };
};
