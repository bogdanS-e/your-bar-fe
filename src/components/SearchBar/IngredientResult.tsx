import { AvailableIngredientButton, useUser } from 'components/AuthHandler';
import { useMemo } from 'react';
import SearchCard, { ISearchCardProps } from './SearchCard';

interface IngredientResultProps extends Omit<ISearchCardProps, 'Icon'> {
  ingredientId: string;
}

const IngredientResult = ({ ingredientId, ...rest }: IngredientResultProps) => {
  const { data: user } = useUser();

  const isAvailable = useMemo(() => {
    return user?.ingredients.includes(ingredientId);
  }, [user]);

  return (
    <SearchCard
      {...rest}
      isAvailable={isAvailable}
      Icon={<AvailableIngredientButton ingredientId={ingredientId} />}
    />
  );
};

export default IngredientResult;
