import { ChipButton } from 'components/Button';
import { toast } from 'react-toastify';

import IconButton from 'components/IconButton';
import { PlusIcon } from 'components/Icons';
import { SearchIngredientModal } from 'components/Ingredient';
import { useToggle } from 'hooks';
import useStore from 'store';
import styled from 'styled-components';
import { Row } from 'styles/components';

interface IIngredientsFilterProps {
  selectedIngredients: string[];
  onChange: (selectedItems: string[]) => void;
}

const IngredientsFilter = ({ selectedIngredients, onChange }: IIngredientsFilterProps) => {
  const [isModalOpen, isModalOpenHandler] = useToggle(false);
  const { getIngredientById } = useStore();

  const onIngredientChoose = (ingredientId: string) => {
    if (selectedIngredients.includes(ingredientId)) {
      toast.info('The ingredient is already added');

      return;
    }

    onChange([...selectedIngredients, ingredientId]);
  };

  const onIngredientRemove = (ingredientId: string) => {
    onChange(selectedIngredients.filter((id) => id !== ingredientId));
  };

  return (
    <Container $justifyContent="flex-start" $gap="10px" $flexWrap="wrap">
      <Title>Cocktails should have:</Title>

      {!selectedIngredients.length && <ChipButton key="example">choose your ingredient</ChipButton>}

      {selectedIngredients.map((ingredientId, i) => (
        <>
          <ChipButton onRemove={() => onIngredientRemove(ingredientId)} key={ingredientId}>
            {getIngredientById(ingredientId)?.nameEn}
          </ChipButton>

          {i < selectedIngredients.length - 1 && '+'}
        </>
      ))}

      <IconButton size={30} onClick={isModalOpenHandler.on}>
        <PlusIcon />
      </IconButton>
      <SearchIngredientModal
        keepUnmount={false}
        isOpen={isModalOpen}
        onClose={isModalOpenHandler.off}
        onChoose={onIngredientChoose}
      />
    </Container>
  );
};

export default IngredientsFilter;

const Container = styled(Row)``;

const Title = styled.span`
  color: #8f8f8f;
  font-style: italic;
`;
