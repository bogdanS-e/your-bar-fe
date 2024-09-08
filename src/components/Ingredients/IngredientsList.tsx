import { IIngredient } from 'types/ingredient';
import useIngredients from './useIngredients';
import IngredientCard from './IngredientCard';
import styled from 'styled-components';

interface IIngredientsListProps {
  initialData: IIngredient[];
}

const IngredientsList = ({ initialData }: IIngredientsListProps) => {
  const { data: queryData } = useIngredients();
  const data = queryData || initialData;

  return (
    <Container>
      {data.map(({ _id, descriptionEn, nameEn, tags, image }) => (
        <StyledIngredientCard
          key={_id}
          name={nameEn}
          description={descriptionEn}
          image={image}
          tags={tags}
        />
      ))}
    </Container>
  );
};

export default IngredientsList;

const gap = '20px';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${gap};
`;

const StyledIngredientCard = styled(IngredientCard)`
  width: calc((100% - 4 * ${gap}) / 5);
`;
