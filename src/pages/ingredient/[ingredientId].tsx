import { getIngredient, getIngredients } from 'api/ingredients';
import { default as IngredientPageComponent } from 'components/Ingredient/IngredientPage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { IIngredient } from 'types/ingredient';

interface IIngredientsProps {
  ingredient: IIngredient | null;
}

const IngredientPage = ({ ingredient }: IIngredientsProps) => {
  if (!ingredient) {
    return <h1>Ingredient not found</h1>;
  }

  return <IngredientPageComponent ingredient={ingredient} />;
};

export default IngredientPage;

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const ingredients = await getIngredients();
  const paths = ingredients.map(({ _id }) => ({
    params: { ingredientId: _id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IIngredientsProps> = async ({
  params,
}) => {
  try {
    const ingredient = await getIngredient(params!.ingredientId as string);
    return {
      props: {
        ingredient,
      },
      revalidate: 24 * 60 * 60, // 1 day
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        ingredient: null,
      },
    };
  }
};
