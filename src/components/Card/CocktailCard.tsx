import { FavoriteCocktailButton } from 'components/AuthHandler';
import Card, { ICardProps } from './Card';
import { useAvailableCocktailsSet } from 'hooks';

interface IIngredientCardProps extends Omit<ICardProps, 'Icon'> {
  cocktailId: string;
}

const CocktailCard = ({ cocktailId, ...props }: IIngredientCardProps) => {
  const availableCocktailsSet = useAvailableCocktailsSet();

  return (
    <Card
      {...props}
      isAvailable={availableCocktailsSet.has(cocktailId)}
      Icon={<FavoriteCocktailButton cocktailId={cocktailId} />}
    />
  );
};

export default CocktailCard;
