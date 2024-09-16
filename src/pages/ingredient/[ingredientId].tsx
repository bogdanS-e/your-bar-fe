import { getIngredient, getIngredients } from "api/ingredients";
import { GetStaticPaths, GetStaticProps } from "next";
import { IIngredient } from "types/ingredient";

interface IIngredientsProps {
  ingredient: IIngredient | null;
}

const IngredientPage = ({ ingredient }: IIngredientsProps) => {
  if (!ingredient) {
    return (
      <h1>Ingredient not found</h1>
    )
  }

  return (
    <div>
      <pre>
        {JSON.stringify(ingredient, null, 2)}
      </pre>
    </div>
  )
}

export default IngredientPage;

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const ingredients = await getIngredients();
  const paths = ingredients.map(({ _id }) => ({
    params: { ingredientId: _id }
  }));

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<IIngredientsProps> = async ({ params }) => {
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
