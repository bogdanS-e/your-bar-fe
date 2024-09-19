import TagButton from 'components/Tag/TagButton';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { Column, Row } from 'styles/components';
import { ICocktail } from 'types/cocktail';

interface ICocktailPageProps {
  cocktail: ICocktail;
}

const CocktailPage = ({ cocktail }: ICocktailPageProps) => {
  const { nameEn, image, descriptionEn, tags, ingredients, _id } = cocktail;

  return (
    <>
      <Head>
        <title>{nameEn}</title>
        <meta name="description" content={descriptionEn} />
        <meta
          name="keywords"
          content={`${nameEn} recipe, how to make ${nameEn}, ${nameEn} ingredients, ${nameEn} preparation, easy ${nameEn} recipe, classic ${nameEn} recipe, mixology guide, cocktail recipes, how to prepare cocktails, step-by-step cocktail recipe, cocktail making guide, home bartending, DIY ${nameEn}, bartender tips for ${nameEn}, best ${nameEn} recipe, cocktail mixing techniques, ${nameEn} drink recipe, how to serve ${nameEn}, cocktail preparation instructions, mixology at home, cocktail ideas, perfect ${nameEn}, ${nameEn} with variations, quick ${nameEn} recipe, professional cocktail making, essential cocktail recipes, cocktail garnishes, summer cocktails, refreshing cocktails, signature cocktails, popular cocktails`}
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
                <TagButton key={tag} tag={tag} isIngredient={false} />
              ))}
            </Row>
          </Column>
        </Row>

        {/* <CocktailsContainer>
          <CocktailTitle>Cocktails with &quot;{nameEn}&quot;:</CocktailTitle>
          <Row $gap="20px">
            {availableCocktails.map(
              ({ _id, nameEn, descriptionEn, image, tags, ingredients }) => (
                <Card
                  key={_id}
                  name={nameEn}
                  description={descriptionEn}
                  image={image}
                  tags={tags}
                  href={`cocktail/${_id}`}
                  ingredients={getIngredientsName(ingredients)}
                />
              )
            )}
          </Row>
        </CocktailsContainer> */}
      </Container>
    </>
  );
};

export default CocktailPage;

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

const StyledImage = styled(Image)`
  display: block;
  max-width: 200px;
  max-height: 400px;
  width: auto;
  height: auto;
`;
