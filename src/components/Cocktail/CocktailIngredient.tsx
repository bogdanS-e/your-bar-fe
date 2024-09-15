import Dropdown from 'components/Dropdown';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import Modal from 'components/Modal';
import SearchBar from 'components/SearchBar';
import TagButton from 'components/Tag/TagButton';
import { FieldArray, useFormikContext } from 'formik';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Row } from 'styles/components';
import { IIngredient } from 'types/ingredient';
import { CocktailTag, CocktailUnit, cocktailUnitInfo } from 'types/cocktail';
import Checkbox from 'components/Checkbox';
import { ICocktailFormValues } from './useCreateCocktail';

interface ICocktailIngredientProps {
  index: number;
  allIngredients: IIngredient[];
}

const CocktailIngredient = ({
  index,
  allIngredients,
}: ICocktailIngredientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const {
    values: { ingredients },
    errors,
    setFieldValue,
    handleChange,
  } = useFormikContext<ICocktailFormValues>();

  const filteredIngredients = useMemo(() => {
    if (!allIngredients) {
      return [];
    }

    const search = searchValue.toLowerCase();

    return allIngredients.filter(({ nameEn }) =>
      nameEn.toLowerCase().includes(search)
    );
  }, [allIngredients, searchValue]);

  const onIngredientChange =
    (ingredientId: string, ingredientName: string) => () => {
      setIsModalOpen(false);
      setSearchValue('');
      setFieldValue(`ingredients.${index}.ingredientId`, ingredientId);
      setFieldValue(`ingredients.${index}.name`, ingredientName);
    };

  const onUnitChange = (unit: CocktailUnit) => {
    setFieldValue(`ingredients.${index}.unit`, unit);
  };

  const onOptionalChange = (isChecked: boolean) => {
    setFieldValue(`ingredients.${index}.isOptional`, isChecked);
  };

  const onDecorationChange = (isChecked: boolean) => {
    setFieldValue(`ingredients.${index}.isDecoration`, isChecked);
  };

  const getError = (key: string) => {
    let err = errors as any;

    if (!index) {
      return err?.[`ingredients.${key}`];
    }

    return err?.[`ingredients.${index}.${key}`];
  };

  if (!allIngredients) {
    return null;
  }

  return (
    <Container>
      <InputsWrapper index={index}>
        <div>
          <StyledInput
            label="name"
            name={`ingredients.${index}.name`}
            value={ingredients[index].name}
            onChange={() => {}}
            readOnly
            onClick={() => setIsModalOpen(true)}
          />

          {getError('name') && <ErrorText>{getError('name')}</ErrorText>}
        </div>

        <div>
          <Input
            label="quantity"
            name={`ingredients.${index}.value`}
            type="tel"
            value={ingredients[index].value}
            onChange={handleChange}
          />

          {getError('value') && <ErrorText>{getError('value')}</ErrorText>}
        </div>

        <div>
          <Row>
            <StyledDropdown
              position="top"
              trigger={
                <Unit justifyContent="flex-end">
                  {cocktailUnitInfo[ingredients[index].unit].title}{' '}
                  <IconButton>▼</IconButton>
                </Unit>
              }
              items={Object.values(cocktailUnitInfo).map(({ key }) => key)}
              renderItem={(unit) => <div>{cocktailUnitInfo[unit].title}</div>}
              onOptionClick={onUnitChange}
            />
            <FieldArray name="ingredients">
              {({ remove }) => (
                <CloseButton
                  size={30}
                  onClick={() => remove(index)}
                  disabled={ingredients.length < 2}
                >
                  ×
                </CloseButton>
              )}
            </FieldArray>
          </Row>

          {getError('unit') && <ErrorText>{getError('unit')}</ErrorText>}
        </div>
      </InputsWrapper>
      <CheckboxWrapper gap="20px">
        <Checkbox
          label="optional"
          isChecked={ingredients[index].isOptional}
          onChange={onOptionalChange}
        />
        <Checkbox
          label="decoration"
          isChecked={ingredients[index].isDecoration}
          onChange={onDecorationChange}
        />
      </CheckboxWrapper>

      <StyledModal
        isOpen={isModalOpen}
        keepUnmount
        onClose={() => setIsModalOpen(false)}
        title="Search ingredient"
      >
        <SearchBar
          autoFocus
          placeholder="Search ingredient"
          onChange={({ currentTarget }) => setSearchValue(currentTarget.value)}
          value={searchValue}
        />
        <IngredientsWrapper>
          {filteredIngredients.map(({ _id, nameEn, image, tags }) => (
            <Ingredient key={_id} onClick={onIngredientChange(_id, nameEn)}>
              <Image image={image || ''} />
              <Content>
                <Name>{nameEn}</Name>
                <Tags>
                  {tags.map((tag) => (
                    <TagButton key={tag} tag={tag} isIngredient />
                  ))}
                </Tags>
              </Content>
            </Ingredient>
          ))}
          {filteredIngredients.length === 0 &&
            'No ingredient match your search'}
        </IngredientsWrapper>
      </StyledModal>
    </Container>
  );
};

export default CocktailIngredient;

const CheckboxWrapper = styled(Row)`
  margin-top: 5px;
  padding: 0 40px;
`;

const StyledDropdown: typeof Dropdown = styled(Dropdown)`
  .dropdown-menu {
    left: -15px;
    max-height: min(40vh, 400px);
  }
`;

const Unit = styled(Row)`
  width: 80px;
`;

const Container = styled.div`
  margin: 10px 0;
`;

const ErrorText = styled.small`
  font-size: 0.625rem;
  color: red;
  display: block;
`;

const CloseButton = styled(IconButton)`
  font-size: 1.5rem;
`;

const InputsWrapper = styled.div<{ index: number }>`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding-left: 40px;
  position: relative;

  > :first-child {
    flex: 2;
  }

  > :nth-child(2) {
    flex: 1;
  }

  &::before {
    content: '${({ index }) => index + 1}';
    position: absolute;
    top: 50%;
    left: 0;
    width: 25px;
    font-size: 0.875rem;
    transform: translateY(-50%);
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledInput = styled(Input)`
  cursor: pointer;
`;

const StyledModal = styled(Modal)`
  height: 90dvh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
`;

const IngredientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
`;

const Name = styled.div`
  font-size: 1.5rem;
`;

const Ingredient = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.15s;

  &:hover {
    background-color: #eee;
  }
`;

const Image = styled.span<{ image: string }>`
  width: 100px;
  aspect-ratio: 1 / 1;
  background: #df00000a url(${({ image }) => image}) no-repeat center;
  background-size: contain;
  border-radius: 10px;
`;
