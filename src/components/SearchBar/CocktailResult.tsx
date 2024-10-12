import { FavoriteCocktailButton } from 'components/Cocktail';
import SearchCard, { ISearchCardProps } from './SearchCard';
import { useAvailableCocktailsSet } from 'hooks';

interface IngredientResultProps extends Omit<ISearchCardProps, 'Icon'> {
  cocktailId: string;
}

const CocktailResult = ({ cocktailId, ...rest }: IngredientResultProps) => {
  const availableCocktailsSet = useAvailableCocktailsSet();

  return (
    <SearchCard
      {...rest}
      isAvailable={availableCocktailsSet.has(cocktailId)}
      Icon={<FavoriteCocktailButton cocktailId={cocktailId} />}
    />
  );
};

export default CocktailResult;
