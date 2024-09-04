import Filter from "components/Filter";
import Head from "next/head";
import styled from "styled-components";
import { IIngredient, IngredientTag } from "../../types/ingredient";
import { useState } from "react";

interface IIngredientsProps {
  data: any;
}

const ingrediensFilter = [
  {
    image: '/images/beverages.png',
    title: 'Bevarages',
    key: IngredientTag.Beverages,
  },
  {
    image: '/images/soft.png',
    title: 'Soft alcohol',
    key: IngredientTag.Soft,
  },
  {
    image: '/images/strong.png',
    title: 'Strong alcohol',
    key: IngredientTag.Strong,
  },
  {
    image: '/images/strong.png',
    title: 'Syrup',
    key: IngredientTag.Syrup,
  },
  {
    image: '/images/strong.png',
    title: 'Fruit',
    key: IngredientTag.Fruit,
  },
  {
    image: '/images/strong.png',
    title: 'Juice',
    key: IngredientTag.Juice,
  },
  {
    image: '/images/strong.png',
    title: 'Other',
    key: IngredientTag.Other,
  },
]

const IngredientsPage = ({ data }: IIngredientsProps) => {
  //get data from BE
  const items: IIngredient[] = [
    {
      tags: [IngredientTag.Beverages]
    },
    {
      tags: [IngredientTag.Strong, IngredientTag.Fruit]
    },
    {
      tags: [IngredientTag.Strong]
    }
  ];

  const [selected, setSelected] = useState(ingrediensFilter.map(({ key }) => key));

  return (
    <>
      <Head>
        <title>Ingredients</title>
        <meta name="description" content="Ingredients" />
      </Head>
      <Main>
        <Title>
          Ingredients
        </Title>
        <Filter
          items={ingrediensFilter}
          selected={selected}
          onChange={setSelected}
        />
      </Main>
    </>
  );
}

export default IngredientsPage;

const Main = styled.main`
  margin: 20px 0;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  color: #8f8f8f;
  margin-bottom: 20px;
`;