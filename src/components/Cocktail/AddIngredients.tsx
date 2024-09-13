import CocktailIngredient from './CocktailIngredient';
import { useFormikContext } from 'formik';
import { ICocktailFormValues } from './AddCocktailModal';
import { useMemo } from 'react';
import useIngredients from 'components/Ingredient/useIngredients';

const AddIngredients = () => {
  const { data: allIngredients } = useIngredients();
  const { values: { ingredients } } = useFormikContext<ICocktailFormValues>();

  const filteredIngredients = useMemo(() => {
    if (!allIngredients) {
      return [];
    }

    const selectedIngredients = ingredients.map(({ ingredientId }) => ingredientId);

    return allIngredients.filter(({ _id }) => !selectedIngredients.includes(_id));
  }, [allIngredients, ingredients]);

  return (
    <div>
      {ingredients.map((_, i) => (
        <CocktailIngredient key={i} index={i} allIngredients={filteredIngredients} />
      ))}
    </div>
  );
};

export default AddIngredients;
