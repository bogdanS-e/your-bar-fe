import CocktailIngredient from './SearchCocktailIngredient';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import { useIngredients } from 'components/Ingredient';
import { ICreateCocktailParams } from 'api/cocktails';

const AddIngredients = () => {
  const { data: allIngredients } = useIngredients();
  const {
    values: { ingredients },
  } = useFormikContext<ICreateCocktailParams>();

  const filteredIngredients = useMemo(() => {
    if (!allIngredients) {
      return [];
    }

    const selectedIngredients = ingredients.map(
      ({ ingredientId }) => ingredientId
    );

    return allIngredients.filter(
      ({ _id }) => !selectedIngredients.includes(_id)
    );
  }, [allIngredients, ingredients]);

  return (
    <div>
      {ingredients.map((_, i) => (
        <CocktailIngredient
          key={i}
          index={i}
          allIngredients={filteredIngredients}
        />
      ))}
    </div>
  );
};

export default AddIngredients;