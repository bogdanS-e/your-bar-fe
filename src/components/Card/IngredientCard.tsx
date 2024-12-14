import { useUser } from 'components/AuthHandler';
import Card, { ICardProps } from './Card';
import { useMemo } from 'react';
import { AvailableIngredientButton } from 'components/Ingredient';

interface IIngredientCardProps extends Omit<ICardProps, 'Icon'> {
  ingredientId: string;
}

const IngredientCard = ({ ingredientId, ...props }: IIngredientCardProps) => {
  const { data: user } = useUser();

  const isAvailable = useMemo(() => {
    return user?.ingredients.includes(ingredientId);
  }, [user, ingredientId]);

  return (
    <Card
      {...props}
      isAvailable={isAvailable}
      Icon={<AvailableIngredientButton ingredientId={ingredientId} />}
    />
  );
};

export default IngredientCard;
