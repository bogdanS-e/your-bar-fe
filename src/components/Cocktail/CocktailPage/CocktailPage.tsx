import TagButton from 'components/Tag/TagButton';
import Head from 'next/head';
import styled from 'styled-components';
import { Column, ImageCircle, Row } from 'styles/components';
import { cocktailUnitInfo, ICocktail } from 'types/cocktail';
import useStore from 'store';
import Link from 'next/link';
import GoBackButton from 'components/GoBackButton';
import { useUser } from 'components/AuthHandler';
import { useAvailableCocktailsSet, useToggle } from 'hooks';
import FavoriteCocktailButton from '../FavoriteCocktailButton';
import CreateCocktailModal from '../CreateCocktail/CreateCocktailModal';
import { useRouter } from 'next/router';

interface ICocktailPageProps {
  initialData: ICocktail | null;
}

const CocktailPage = ({ initialData }: ICocktailPageProps) => {
  const { data: user } = useUser();
  const router = useRouter();
  const availableCocktailsSet = useAvailableCocktailsSet();
  const { getIngredientById, getCocktailBySlug } = useStore();

  const [isEditOpen, handleEditOpen] = useToggle(false);
  const availableIngredientsSet = new Set(user?.ingredients || []);
  const cocktail = getCocktailBySlug(router.query.cocktailSlug as string) || initialData;

  if (!cocktail) {
    return <h1>Ingredient not found</h1>;
  }

  const { nameEn, image, descriptionEn, tags, ingredients, recipeEn, _id } = cocktail;

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
        <CocktailContainer
          $alignItems="stretch"
          $gap="20px"
          $isAvailable={availableCocktailsSet.has(_id)}
        >
          <StyledImage width={200} height={400} src={image || ''} alt={nameEn} />
          <Column $alignItems="flex-start" $fullWidth>
            <Row $justifyContent="space-between" $fullWidth>
              <Title>{nameEn}</Title>
              <FavoriteCocktailButton cocktailId={_id} />
              <button onClick={handleEditOpen.on}>edit</button>
            </Row>
            <Description>{descriptionEn}</Description>
            <Row $gap="10px">
              {tags.map((tag) => (
                <TagButton key={tag} tag={tag} isIngredient={false} />
              ))}
            </Row>
          </Column>
        </CocktailContainer>

        <Row $alignItems="stretch" $flexWrap="wrap">
          <Article>
            <h2>Ingredients:</h2>
            <br />
            <Ingredients>
              {ingredients.map(({ ingredientId, isOptional, isDecoration, value, unit }) => {
                const ingredient = getIngredientById(ingredientId);

                if (!ingredient) {
                  return null;
                }

                const { nameEn, image, slug, _id } = ingredient;

                return (
                  <li key={ingredientId}>
                    <Link href={`/ingredient/${slug}`}>
                      <IngredientItem $isAvailable={availableIngredientsSet.has(_id)}>
                        <Row $alignItems="center" $gap="20px">
                          <ImageCircle src={image || ''} width={80} height={80} alt={nameEn} />
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
              })}
            </Ingredients>
          </Article>
          <Article>
            <h2>Recipe:</h2>
            <br />
            <Recipe>{recipeEn}</Recipe>
          </Article>
        </Row>
      </Container>

      <CreateCocktailModal
        isOpen={isEditOpen}
        onClose={handleEditOpen.off}
        initialData={{
          cocktailId: _id,
          name: nameEn,
          description: descriptionEn,
          recipe: recipeEn,
          tags,
          ingredients,
          image: image || '',
        }}
      />
    </>
  );
};

export default CocktailPage;

const CocktailContainer = styled(Row)<{ $isAvailable: boolean }>`
  width: fit-content;
  min-width: 50%;
  padding: 20px 20px 20px 10px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  background: ${({ $isAvailable, theme }) =>
    $isAvailable ? theme.color.availableBackground : 'none'};
  transition: background 0.5s;
`;

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

const IngredientItem = styled(Row)<{ $isAvailable: boolean }>`
  justify-content: space-between;
  padding: 5px 10px;
  transition: background 0.15s;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow:
    5px 5px 10px #ebdddd,
    -4px -2px 10px #ededed;
  background: ${({ $isAvailable, theme }) =>
    $isAvailable ? theme.color.availableBackground : 'none'};
  border: ${({ $isAvailable, theme }) =>
    $isAvailable ? `1px solid ${theme.color.availableBorder}` : 'none'};

  &:hover {
    background: ${({ $isAvailable }) => ($isAvailable ? '#ecf3ed' : '#fff6f6')};
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
  width: 50%;

  &:last-child {
    padding-left: 50px;
  }
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
