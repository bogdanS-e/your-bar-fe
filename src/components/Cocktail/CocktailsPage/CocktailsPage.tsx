import { cocktailTagInfo, ICocktail } from 'types/cocktail';
import AllCocktailsTab from './Tabs/AllCocktailsTab';
import Head from 'next/head';
import { useState } from 'react';
import { IngredientsFilter, TagsFilter } from 'components/Filter';
import styled from 'styled-components';

interface ICocktailsPageProps {
  initialData: ICocktail[];
}

const cocktailsFilter = Object.values(cocktailTagInfo);

const CocktailsPage = ({ initialData }: ICocktailsPageProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState(
    cocktailsFilter.map(({ key }) => key)
  );

  return (
    <>
      <Head>
        <title>Cocktails | Your Bar</title>
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
      <Title>Cocktails</Title>
      <TagsFilter
        items={cocktailsFilter}
        selectedTags={selectedTags}
        onChange={setSelectedTags}
      />
      <IngredientsFilter
        selectedIngredients={selectedIngredients}
        onChange={setSelectedIngredients}
      />
      <AllCocktailsTab
        initialData={initialData}
        selectedTags={selectedTags}
        selectedIngredients={selectedIngredients}
      />
    </>
  );
};

export default CocktailsPage;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  color: #8f8f8f;
  margin: 20px 0;
`;
