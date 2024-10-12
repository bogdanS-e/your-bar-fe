import Head from 'next/head';
import { CocktailTag, ICocktail } from 'types/cocktail';
import Cocktails from '../Cocktails';

interface IIngredientsPageProps {
  initialData: ICocktail[];
  selectedTags: CocktailTag[];
  selectedIngredients: string[];
}

const AllCocktailsTab = (props: IIngredientsPageProps) => {
  return (
    <>
      <Head>
        <title>All Cocktails | Your Bar</title>
      </Head>
      <Cocktails {...props} />
    </>
  );
};

export default AllCocktailsTab;
