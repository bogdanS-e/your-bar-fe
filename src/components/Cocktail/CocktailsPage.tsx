import { ICocktail } from 'types/cocktail';
import AllCocktailsTab from './Tabs/AllCocktailsTab';

interface ICocktailsPageProps {
  initialData: ICocktail[];
}

const CocktailsPage = ({ initialData }: ICocktailsPageProps) => {
  return (
    <>
      <AllCocktailsTab initialData={initialData} />
    </>
  );
};

export default CocktailsPage;
