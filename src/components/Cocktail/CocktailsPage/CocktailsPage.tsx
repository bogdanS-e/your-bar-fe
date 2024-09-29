import { ICocktail } from 'types/cocktail';
import AllCocktailsTab from './Tabs/AllCocktailsTab';
import Head from 'next/head';

interface ICocktailsPageProps {
  initialData: ICocktail[];
}

const CocktailsPage = ({ initialData }: ICocktailsPageProps) => {
  return (
    <>
      <Head>
        <title>{`Cocktails | Your Bar`}</title>
        <meta
          name="description"
          content="Discover our complete list of cocktails in one place. Browse and explore cocktail recipes, from classic favorites to new creations, perfect for any occasion."
        />
        <meta
          name="keywords"
          content="all cocktails, cocktail list, cocktail recipes, classic cocktails, drink recipes, cocktails online, mixology, craft cocktails, cocktail app, drink ideas"
        />
        <meta property="og:title" content="Cocktails | Your Bar" />
        <meta
          property="og:description"
          content="Discover our complete list of cocktails in one place. Browse and explore cocktail recipes, from classic favorites to new creations, perfect for any occasion."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dl6mqzurj/image/upload/v1727598448/180131-wondrich-bad-cocktail-tease_wghhv8_thumbnail_720x720_tof3bg.png"
        />
      </Head>
      <AllCocktailsTab initialData={initialData} />
    </>
  );
};

export default CocktailsPage;
