import { getIngredient, getIngredients } from 'api/ingredients';
import { IngredientPage as IngredientPageComponent } from 'components/Ingredient';
import { GetStaticPaths, GetStaticProps } from 'next';
import { IIngredient } from 'types/ingredient';

interface IIngredientsProps {
  ingredient: IIngredient | null;
}

const IngredientPage = ({ ingredient }: IIngredientsProps) => {
  return <IngredientPageComponent initialData={ingredient} />;
};

export default IngredientPage;

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const ingredients = await getIngredients();
  const paths = ingredients.map(({ slug }) => ({
    params: { ingredientSlug: slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IIngredientsProps> = async ({ params }) => {
  try {
    const ingredient = await getIngredient(params!.ingredientSlug as string);
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
