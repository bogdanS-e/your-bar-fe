import CocktailIngredient from './CocktailIngredient';
import { useFormikContext } from 'formik';
import { ICocktailFormValues } from './AddCocktailModal';

const AddIngredients = () => {
  const { values: { ingredients } } = useFormikContext<ICocktailFormValues>();

  return (
    <div>
      {ingredients.map((_, i) => (
        <CocktailIngredient key={i} index={i} />
      ))}
    </div>
  );
};

export default AddIngredients;
