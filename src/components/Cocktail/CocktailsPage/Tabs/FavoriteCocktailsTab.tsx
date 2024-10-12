import { useUser } from 'components/AuthHandler';
import Head from 'next/head';
import { useMemo } from 'react';
import useStore from 'store';
import { CocktailTag, ICocktail } from 'types/cocktail';
import Cocktails from '../Cocktails';

interface IFavoriteCocktailsTabProps {
  initialData: ICocktail[];
  selectedTags: CocktailTag[];
  selectedIngredients: string[];
}

const FavoriteCocktailsTab = (props: IFavoriteCocktailsTabProps) => {
  const { data: user } = useUser();
  const { getCocktailById } = useStore();

  const favoriteCocktails = useMemo(() => {
    if (!user) {
      return [];
    }

    const cocktails: ICocktail[] = [];
    for (const cocktailId of user.favoriteCocktails) {
      const cocktail = getCocktailById(cocktailId);

      if (cocktail) {
        cocktails.push(cocktail);
      }
    }

    return cocktails;
  }, [user, getCocktailById]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Favorite Cocktails | Your Bar</title>
      </Head>
      <Cocktails {...props} cocktails={favoriteCocktails} />
    </>
  );
};

export default FavoriteCocktailsTab;
