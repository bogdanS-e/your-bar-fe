import { TagsFilter } from 'components/Filter';
import Head from 'next/head';
import styled from 'styled-components';
import { IIngredient, ingredientTagInfo } from 'types/ingredient';
import { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Tabs } from 'components/Tabs';
import MyIngredientsTab from './Tabs/MyIngredientsTab';
import AllIngredientsTab from './Tabs/AllIngredientsTab';
import useStore from 'store';
import Typography from 'styles/Typography';
import { UpMd } from 'styles/media';

interface IIngredientsPageProps {
  initialData: IIngredient[];
}

const ingredientsFilter = Object.values(ingredientTagInfo);

const IngredientsPage = ({ initialData }: IIngredientsPageProps) => {
  const { isAuthenticated } = useAuth0();
  const {
    selectedIngredientTags,
    activeIngredientTab,
    setSelectedIngredientTags,
    setActiveIngredientTab,
  } = useStore();

  const tabData = useMemo(() => {
    return [
      {
        label: 'My Ingredients',
        content: (
          <MyIngredientsTab selectedTags={selectedIngredientTags} initialData={initialData} />
        ),
      },
      {
        label: 'All Ingredients',
        content: (
          <AllIngredientsTab selectedTags={selectedIngredientTags} initialData={initialData} />
        ),
      },
    ];
  }, [initialData, selectedIngredientTags]);

  return (
    <>
      <Head>
        <title>Ingredients | Your Bar</title>
        <meta
          name="description"
          content="Explore a wide range of cocktail ingredients in our online cocktails app. Search for cocktails by ingredient and discover recipes to craft the perfect drink at home."
        />
        <meta
          name="keywords"
          content="cocktail ingredients, cocktail recipes, online cocktails, search cocktails by ingredient, drink recipes, mixology, cocktail app, cocktail search, craft cocktails, cocktail recipes online"
        />
        <meta property="og:title" content="Ingredients | Your Bar" />
        <meta
          property="og:description"
          content="Explore a wide range of cocktail ingredients in our online cocktails app. Search for cocktails by ingredient and discover recipes to craft the perfect drink at home."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dl6mqzurj/image/upload/v1727598448/180131-wondrich-bad-cocktail-tease_wghhv8_thumbnail_720x720_tof3bg.png"
        />
      </Head>
      <Main>
        <Title variant="h4" as="h1">
          Ingredients
        </Title>
        <UpMd>
          <TagsFilter
            items={ingredientsFilter}
            selectedTags={selectedIngredientTags}
            onChange={setSelectedIngredientTags}
          />
        </UpMd>

        {isAuthenticated ? (
          <StyledTabs
            tabs={tabData}
            activeTab={activeIngredientTab}
            onChange={setActiveIngredientTab}
          />
        ) : (
          <AllIngredientsTab selectedTags={selectedIngredientTags} initialData={initialData} />
        )}
      </Main>
    </>
  );
};

export default IngredientsPage;

const StyledTabs = styled(Tabs)`
  margin-top: 10px;
`;

const Main = styled.div`
  margin: 20px 0;
`;

const Title = styled(Typography)`
  font-weight: 400;
  color: #8f8f8f;
  margin-bottom: 20px;
`;
