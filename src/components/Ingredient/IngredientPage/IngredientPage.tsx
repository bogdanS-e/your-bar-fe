import { LoginModal, useUser } from 'components/AuthHandler';
import { CocktailCard } from 'components/Card';
import GoBackButton from 'components/GoBackButton';
import TagButton from 'components/Tag/TagButton';
import { useAvailableCocktailsSet, useToggle } from 'hooks';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import useStore from 'store';
import styled from 'styled-components';
import { Column, Row } from 'styles/components';
import { IIngredient } from 'types/ingredient';
import AvailableIngredientButton from '../AvailableIngredientButton';

interface IIngredientPageProps {
  initialData: IIngredient | null;
}

const IngredientPage = ({ initialData }: IIngredientPageProps) => {
  const { getIngredientsName, getCocktailsByIngredientId, getIngredientBySlug } = useStore();
  const router = useRouter();
  const { data: user } = useUser();
  const availableCocktailsSet = useAvailableCocktailsSet();

  const ingredient = initialData || getIngredientBySlug(router.query.ingredientSlug as string);

  const [isLoginOpen, isLoginOpenHandler] = useToggle(false);

  const isAvailable = useMemo(() => {
    if (!ingredient) {
      return false;
    }

    return !!user?.ingredients.includes(ingredient._id);
  }, [user]);

  if (!ingredient) {
    return <h1>Ingredient not found</h1>;
  }

  const { nameEn, image, descriptionEn, tags, _id } = ingredient;
  const availableCocktails = getCocktailsByIngredientId(_id);

  if (user?.ingredients) {
    availableCocktails.sort((a, b) => {
      const x = availableCocktailsSet.has(a._id);
      const y = availableCocktailsSet.has(b._id);

      if (x === y) {
        return 0;
      }

      if (x) {
        return -1;
      }

      return 1;
    });
  }

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
      <GoBackButton />
      <Container>
        <IngredientContainer $alignItems="stretch" $gap="50px" $isAvailable={isAvailable}>
          <StyledImage width={200} height={400} src={image || ''} alt={nameEn} />
          <Column $alignItems="flex-start" $fullWidth>
            <Row $justifyContent="space-between" $fullWidth>
              <Title>{nameEn}</Title>
              <AvailableIngredientButton ingredientId={_id} />
            </Row>
            <Description>{descriptionEn}</Description>
            <Row $gap="10px">
              {tags.map((tag) => (
                <TagButton key={tag} tag={tag} isIngredient />
              ))}
            </Row>
          </Column>
        </IngredientContainer>

        <CocktailsContainer>
          <CocktailTitle>Cocktails with &quot;{nameEn}&quot;:</CocktailTitle>
          <Row $gap="20px" $alignItems="stretch" $flexWrap="wrap">
            {availableCocktails.map(
              ({ _id, slug, nameEn, descriptionEn, image, tags, ingredients }) => (
                <CocktailCard
                  key={_id}
                  cocktailId={_id}
                  name={nameEn}
                  description={descriptionEn}
                  image={image}
                  tags={tags}
                  href={`/cocktail/${slug}`}
                  ingredients={getIngredientsName(ingredients)}
                />
              )
            )}
          </Row>
        </CocktailsContainer>
      </Container>
      <LoginModal isOpen={isLoginOpen} onClose={isLoginOpenHandler.off} />
    </>
  );
};

export default IngredientPage;

const IngredientContainer = styled(Row)<{ $isAvailable: boolean }>`
  width: fit-content;
  min-width: 50%;
  padding: 20px 20px 20px 10px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  background: ${({ $isAvailable, theme }) =>
    $isAvailable ? theme.color.availableBackground : 'none'};
  transition: background 0.5s;
`;

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
  margin: 20px 0;
`;

const Title = styled.h1`
  font-size: 2rem;
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
