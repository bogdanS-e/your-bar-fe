import { GetStaticProps } from 'next';

import { ICocktail } from 'types/cocktail';

import { CocktailsPage } from 'components/Cocktail';
import { getCocktails } from 'api/cocktails';

interface ICocktailsProps {
  initialData: ICocktail[];
}

const Cocktails = ({ initialData }: ICocktailsProps) => (
  <CocktailsPage initialData={initialData} />
);

export default Cocktails;

export const getStaticProps: GetStaticProps<ICocktailsProps> = async () => {
  const cocktails = await getCocktails();

  return {
    props: {
      initialData: cocktails,
    },
    revalidate: 24 * 60 * 60, // 1 day
  };
};
