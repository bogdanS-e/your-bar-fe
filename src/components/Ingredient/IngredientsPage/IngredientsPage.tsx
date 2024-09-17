import Filter from 'components/Filter';
import Head from 'next/head';
import styled from 'styled-components';
import { IIngredient, ingredientTagInfo } from 'types/ingredient';
import { useState } from 'react';
import IngredientsList from './IngredientsList';

interface IIngredientsPageProps {
  initialData: IIngredient[];
}

const ingrediensFilter = Object.values(ingredientTagInfo);

const IngredientsPage = ({ initialData }: IIngredientsPageProps) => {
  const [selectedTags, setSelectedTags] = useState(
    ingrediensFilter.map(({ key }) => key)
  );

  return (
    <>
      <Head>
        <title>Ingredients</title>
        <meta name="description" content="Ingredients" />
      </Head>
      <Main>
        <Title>Ingredients</Title>
        <Filter
          items={ingrediensFilter}
          selectedTags={selectedTags}
          onChange={setSelectedTags}
        />
        <IngredientsList
          selectedTags={selectedTags}
          initialData={initialData}
        />
      </Main>
    </>
  );
};

export default IngredientsPage;

const Main = styled.div`
  margin: 20px 0;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  color: #8f8f8f;
  margin-bottom: 20px;
`;
