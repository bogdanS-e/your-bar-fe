import { useUser } from 'components/AuthHandler';
import { useMemo } from 'react';
import SearchCard, { ISearchCardProps } from './SearchCard';
import { AvailableIngredientButton } from 'components/Ingredient';

interface IngredientResultProps extends Omit<ISearchCardProps, 'Icon'> {
  ingredientId: string;
}

const IngredientResult = ({ ingredientId, ...rest }: IngredientResultProps) => {
  const { data: user } = useUser();

  const isAvailable = useMemo(() => {
    return user?.ingredients.includes(ingredientId);
  }, [user, ingredientId]);

  return (
    <SearchCard
      {...rest}
      isAvailable={isAvailable}
      Icon={<AvailableIngredientButton ingredientId={ingredientId} />}
    />
  );
};

export default IngredientResult;
