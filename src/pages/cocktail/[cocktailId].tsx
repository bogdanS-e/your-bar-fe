import { getCocktail, getCocktails } from 'api/cocktails';
import { CocktailPage as CocktailPageComponent } from 'components/Cocktail';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ICocktail } from 'types/cocktail';

interface ICocktailPageProps {
  cocktail: ICocktail | null;
}

const CocktailPage = ({ cocktail }: ICocktailPageProps) => {
  if (!cocktail) {
    return <h1>Cocktail not found</h1>;
  }

  return <CocktailPageComponent cocktail={cocktail} />;
};

export default CocktailPage;

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const cocktails = await getCocktails();
  const paths = cocktails.map(({ _id }) => ({
    params: { cocktailId: _id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ICocktailPageProps> = async ({
  params,
}) => {
  try {
    const cocktail = await getCocktail(params!.cocktailId as string);
    return {
      props: {
        cocktail,
      },
      revalidate: 24 * 60 * 60, // 1 day
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        cocktail: null,
      },
    };
  }
};
