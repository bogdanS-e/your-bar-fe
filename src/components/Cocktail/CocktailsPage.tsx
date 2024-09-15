import { ICocktail, ICocktailIngredient } from 'types/cocktail';
import useCocktails from './useCocktails';
import styled from 'styled-components';
import Card from 'components/Card';
import { Row } from 'styles/components';
import { useCallback } from 'react';
import useStore from 'store';

interface ICocktailsPageProps {
  initialData: ICocktail[];
}

const CocktailsPage = ({ initialData }: ICocktailsPageProps) => {
  const { data: queryData } = useCocktails();

  const { ingredientsMap } = useStore();

  const cocktails = queryData || initialData;

  const getIngredientsName = useCallback(
    (obj: ICocktailIngredient[]) => {
      if (!ingredientsMap.size) {
        return ['cocktail name'];
      }

      const ingredientsName: string[] = [];

      for (let i = 0; i < 3; i++) {
        const { ingredientId } = obj[i];

        const { nameEn } = ingredientsMap.get(ingredientId) || {};

        if (!nameEn) {
          continue;
        }

        ingredientsName.push(nameEn);
      }

      return ingredientsName;
    },
    [ingredientsMap]
  );

  return (
    <Row gap={gap} flexWrap="wrap">
      {cocktails.map(
        ({ _id, nameEn, descriptionEn, image, tags, ingredients }) => (
          <StyledCard
            key={_id}
            name={nameEn}
            description={descriptionEn}
            image={image}
            tags={tags}
            ingredients={getIngredientsName(ingredients)}
          />
        )
      )}
    </Row>
  );
};

export default CocktailsPage;

const gap = '20px';

const StyledCard = styled(Card)`
  width: calc((100% - 4 * ${gap}) / 5);
`;
