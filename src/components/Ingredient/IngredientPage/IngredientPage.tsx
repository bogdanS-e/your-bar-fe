import { useUser } from 'components/AuthHandler';
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
import { IIngredient, IngredientTag } from 'types/ingredient';
import AvailableIngredientButton from '../AvailableIngredientButton';
import CreateIngredientModal from '../CreateIngredientModal';
import EditButton from 'components/Button/EditButton';
import DeleteButton from 'components/Button/DeleteButton';
import { ConfirmationModal } from 'components/Modal';
import useDeleteIngredient from '../useDeleteIngredient';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IResError } from 'types/common';
import { getAxiosError } from 'utils/common';

interface IIngredientPageProps {
  initialData: IIngredient | null;
}

const IngredientPage = ({ initialData }: IIngredientPageProps) => {
  const { getIngredientsName, getCocktailsByIngredientId, getIngredientBySlug } = useStore();
  const router = useRouter();
  const { data: user } = useUser();
  const availableCocktailsSet = useAvailableCocktailsSet();
  const deleteIngredientMutation = useDeleteIngredient();

  const ingredient = initialData || getIngredientBySlug(router.query.ingredientSlug as string);

  const [isEditOpen, handleIsEditOpen] = useToggle(false);
  const [isDeleteOpen, handleisDeleteOpen] = useToggle(false);

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

  const onDelete = async () => {
    await toast.promise<unknown, AxiosError<IResError>>(
      async () => await deleteIngredientMutation.mutateAsync(_id),
      {
        pending: 'Deleting ingredient...',
        success: {
          render: () => {
            handleisDeleteOpen.off();

            return (
              <span>
                <b>{nameEn}</b> ingredient has been deleted 👌
              </span>
            );
          },
        },
        error: {
          render: ({ data }) => getAxiosError(data),
        },
      }
    );

    router.push('/ingredients');
  };

  const isCustomIngredient = user && tags.includes(IngredientTag.Custom);

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
              <Row $gap="15px">
                <AvailableIngredientButton ingredientId={_id} />

                {isCustomIngredient && (
                  <>
                    <EditButton onClick={handleIsEditOpen.on} />
                    <DeleteButton onClick={handleisDeleteOpen.on} />
                  </>
                )}
              </Row>
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
        <CreateIngredientModal
          isOpen={isEditOpen}
          onClose={handleIsEditOpen.off}
          initialData={{
            ingredientId: _id,
            name: nameEn,
            description: descriptionEn,
            tags,
            image: image || '',
          }}
        />
        <ConfirmationModal
          isOpen={isDeleteOpen}
          onClose={handleisDeleteOpen.off}
          title="Delete ingredient"
          cancel={{ text: 'Nevermind' }}
          confirm={{
            text: 'Delete',
            variant: 'error',
            disabled: deleteIngredientMutation.isPending,
          }}
          onConfirm={onDelete}
        >
          <ConfirmationText>
            Are you sure want to delete <b>&quot;{nameEn}&quot;</b> ingredient?
            <ConfirmationWarningText>
              If you delete the ingredient you won&apos;t be able to restore it
            </ConfirmationWarningText>
          </ConfirmationText>
        </ConfirmationModal>
      </Container>
    </>
  );
};

export default IngredientPage;

const ConfirmationText = styled.div`
  margin: 10px 0 50px;
`;

const ConfirmationWarningText = styled.div`
  margin-top: 5px;
  font-size: 0.875rem;
  color: #aaa;
`;

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
