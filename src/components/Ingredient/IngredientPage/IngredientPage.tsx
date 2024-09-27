import Card from 'components/Card';
import TagButton from 'components/Tag/TagButton';
import Head from 'next/head';

import useStore from 'store';
import styled from 'styled-components';
import { Column, Row } from 'styles/components';
import { IIngredient } from 'types/ingredient';

interface IIngredientPageProps {
  ingredient: IIngredient;
}

const IngredientPage = ({ ingredient }: IIngredientPageProps) => {
  const { nameEn, image, descriptionEn, tags, _id } = ingredient;
  const { getIngredientsName, getCocktailsByIngredientId } = useStore();

  const availableCocktails = getCocktailsByIngredientId(_id);

  return (
    <>
      <Head>
        <title>{`${nameEn} | Your Bar`}</title>
        <meta name="description" content={descriptionEn} />
        <meta
          name="keywords"
          content={`ingredient, cocktail recipes, cocktails with ${nameEn}, ${nameEn} drinks, how to use ${nameEn}, make cocktails with ${nameEn}, ${nameEn} cocktails, cocktail ingredients, drink recipes, mixology with ${nameEn}, bartending recipes, cocktail ideas`}
        />
        <meta property="og:title" content={nameEn} />
        <meta property="og:description" content={descriptionEn} />
        <meta property="og:image" content={image || ''} />
      </Head>
      <Container>
        <Row $alignItems="stretch" $gap="50px">
          <StyledImage
            width={200}
            height={400}
            src={image || ''}
            alt={nameEn}
          />
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
          <CocktailTitle>Cocktails with &quot;{nameEn}&quot;:</CocktailTitle>
          <Row $gap="20px" $alignItems="stretch" $flexWrap="wrap">
            {availableCocktails.map(
              ({ _id, nameEn, descriptionEn, image, tags, ingredients }) => (
                <Card
                  key={_id}
                  name={nameEn}
                  description={descriptionEn}
                  image={image}
                  tags={tags}
                  href={`/cocktail/${_id}`}
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

const StyledImage = styled.img`
  display: block;
  max-width: 200px;
  max-height: 400px;
  width: auto;
  height: auto;
`;
