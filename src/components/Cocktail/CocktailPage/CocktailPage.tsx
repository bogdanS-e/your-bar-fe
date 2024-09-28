import TagButton from 'components/Tag/TagButton';
import Head from 'next/head';
import styled from 'styled-components';
import { Column, ImageCircle, Row } from 'styles/components';
import { cocktailUnitInfo, ICocktail } from 'types/cocktail';
import useStore from 'store';
import Link from 'next/link';
import GoBackButton from 'components/GoBackButton';

interface ICocktailPageProps {
  cocktail: ICocktail;
}

const CocktailPage = ({ cocktail }: ICocktailPageProps) => {
  const { getIngredientById } = useStore();
  const { nameEn, image, descriptionEn, tags, ingredients, recipeEn } =
    cocktail;

  return (
    <>
      <Head>
        <title>{`${nameEn} | Your Bar`}</title>
        <meta name="description" content={descriptionEn} />
        <meta
          name="keywords"
          content={`${nameEn} recipe, how to make ${nameEn}, ${nameEn} ingredients, ${nameEn} preparation, easy ${nameEn} recipe, classic ${nameEn} recipe, mixology guide, cocktail recipes, how to prepare cocktails, step-by-step cocktail recipe, cocktail making guide, home bartending, DIY ${nameEn}, bartender tips for ${nameEn}, best ${nameEn} recipe, cocktail mixing techniques, ${nameEn} drink recipe, how to serve ${nameEn}, cocktail preparation instructions, mixology at home, cocktail ideas, perfect ${nameEn}, ${nameEn} with variations, quick ${nameEn} recipe, professional cocktail making, essential cocktail recipes, cocktail garnishes, summer cocktails, refreshing cocktails, signature cocktails, popular cocktails`}
        />
        <meta property="og:title" content={nameEn} />
        <meta property="og:description" content={descriptionEn} />
        <meta property="og:image" content={image || ''} />
      </Head>
      <GoBackButton />
      <Container>
        <Row $alignItems="stretch">
          <StyledImage
            width={200}
            height={400}
            src={image || ''}
            alt={nameEn}
          />
          <Column $alignItems="flex-start" $justifyContent="space-between">
            <div>
              <Title>{nameEn}</Title>
              <Description>{descriptionEn}</Description>
            </div>

            <Row $gap="10px">
              {tags.map((tag) => (
                <TagButton key={tag} tag={tag} isIngredient={false} />
              ))}
            </Row>
          </Column>
        </Row>
        <Row $alignItems="stretch" $flexWrap="wrap" $gap="50px">
          <Article>
            <h2>Ingredients:</h2>
            <br />
            <Ingredients>
              {ingredients.map(
                ({ ingredientId, isOptional, isDecoration, value, unit }) => {
                  const ingredient = getIngredientById(ingredientId);

                  if (!ingredient) {
                    return null;
                  }

                  const { nameEn, image } = ingredient;

                  return (
                    <li key={ingredientId}>
                      <Link href={`/ingredient/${ingredientId}`}>
                        <IngredientItem>
                          <Row $alignItems="center" $gap="20px">
                            <ImageCircle
                              src={image || ''}
                              width={80}
                              height={80}
                              alt={nameEn}
                            />
                            <Column $alignItems="flex-start">
                              <span>{nameEn}</span>

                              {(isDecoration || isOptional) && (
                                <Decoration>
                                  &#40;
                                  {isDecoration && <span>decoration</span>}
                                  {isOptional && <span>optional</span>}
                                  &#41;
                                </Decoration>
                              )}
                            </Column>
                          </Row>
                          <IngredeintValue>
                            {value} {cocktailUnitInfo[unit].title}
                          </IngredeintValue>
                        </IngredientItem>
                      </Link>
                    </li>
                  );
                }
              )}
            </Ingredients>
          </Article>
          <Article>
            <h2>Recipe:</h2>
            <br />
            <Recipe>{recipeEn}</Recipe>
          </Article>
        </Row>
      </Container>
    </>
  );
};

export default CocktailPage;

const IngredeintValue = styled.span`
  color: #aaa;
  font-size: 1rem;
`;

const Decoration = styled.small`
  font-size: 0.875rem;
  color: #aaa;

  span:not(:last-child) {
    &::after {
      content: ', ';
      white-space: pre;
    }
  }
`;

const IngredientItem = styled(Row)`
  justify-content: space-between;
  padding: 5px 10px;
  transition: background 0.15s;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow:
    5px 5px 10px #ebdddd,
    -4px -2px 10px #ededed;

  &:hover {
    background-color: #fff6f6;
  }
`;

const Ingredients = styled.ul`
  border-radius: 10px;
  font-size: 1.125rem;
  color: #575757;
  list-style: none;

  /* li {
    border-bottom: 1px solid #aaa;

    &:first-child {
      border-top: 1px solid #aaa;
    }
  } */
`;

const Recipe = styled.div`
  white-space: pre-line;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow:
    5px 5px 10px #ebdddd,
    -4px -2px 10px #ededed;
  line-height: 1.5;
  font-size: 1.125rem;
  color: #575757;
`;

const Article = styled.article`
  margin: 50px 0;
  flex: 1;
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
