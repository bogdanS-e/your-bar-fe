import CocktailIngredient from './SearchCocktailIngredient';
import { useFormikContext } from 'formik';
import { ICreateCocktailParams } from 'api/cocktails';

const AddIngredients = () => {
  const {
    values: { ingredients },
  } = useFormikContext<ICreateCocktailParams>();

  return (
    <div>
      {ingredients.map((_, i) => (
        <CocktailIngredient
          key={i}
          index={i}
        />
      ))}
    </div>
  );
};

export default AddIngredients;
