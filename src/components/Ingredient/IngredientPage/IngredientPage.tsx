import Card from 'components/Card';
import TagButton from 'components/Tag/TagButton';
import Head from 'next/head';
import { useMemo } from 'react';
import useStore from 'store';
import styled from 'styled-components';
import { Column, Row } from 'styles/components';
import { IIngredient } from 'types/ingredient';

interface IIngredientPageProps {
  ingredient: IIngredient;
}

const IngredientPage = ({ ingredient }: IIngredientPageProps) => {
  const { nameEn, image, descriptionEn, tags, _id } = ingredient;

  const availableCoctails = useStore((state) =>
    state.getCocktailsByIngredientId(_id)
  );
  const { getIngredientsName } = useStore();

  return (
    <>
      <Head>
        <title>{nameEn}</title>
        <meta name="description" content={descriptionEn} />
        <meta
          name="keywords"
          content={`ingredient, cocktail recipes, cocktails with ${nameEn}, ${nameEn} drinks, how to use ${nameEn}, make cocktails with ${nameEn}, ${nameEn} cocktails, cocktail ingredients, drink recipes, mixology with ${nameEn}, bartending recipes, cocktail ideas`}
        />
        <meta property="og:title" content={nameEn} />
        <meta property="og:description" content={descriptionEn} />
        <meta property="og:image" content={image || ''} />
        <meta
          property="og:url"
          content="http://localhost:3000/ingredient/66d853820e1303e3ad494743"
        />
      </Head>
      <Container>
        <Row $alignItems="stretch" $gap="50px">
          <Image src={image || ''} alt={nameEn} />
          <Column $alignItems="flex-start">
            <Title>{nameEn}</Title>
            <Description>{descriptionEn}</Description>
            <Row $gap="10px">
              {tags.map((tag) => (
                <TagButton key={tag} tag={tag} isIngredient />
              ))}
            </Row>
          </Column>
        </Row>

        <CocktailsContainer>
          <CocktailTitle>Cocktails with "{nameEn}":</CocktailTitle>
          <Row $gap="20px">
            {availableCoctails.map(
              ({ _id, nameEn, descriptionEn, image, tags, ingredients }) => (
                <Card
                  key={_id}
                  name={nameEn}
                  description={descriptionEn}
                  image={image}
                  tags={tags}
                  href={`coctail/${_id}`}
                  ingredients={getIngredientsName(ingredients)}
                />
              )
            )}
          </Row>
        </CocktailsContainer>
      </Container>
    </>
  );
};

export default IngredientPage;

const CocktailTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const CocktailsContainer = styled.article`
  display: block;
  margin-top: 60px;
`;

const Description = styled.p`
  font-size: 1rem;
  max-width: 600px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 20px 0;
`;

const Container = styled.section`
  margin: 40px auto 20px;
  max-width: 1450px;
`;

const Image = styled.img`
  display: block;
  max-width: 200px;
  max-height: 400px;
`;
