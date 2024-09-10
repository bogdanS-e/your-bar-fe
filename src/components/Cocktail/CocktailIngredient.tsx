import useIngredients from "components/Ingredient/useIngredients";
import Input from "components/Input";
import Modal from "components/Modal";
import SearchBar from "components/SearchBar";
import TagButton from "components/Tag/TagButton";
import { useMemo, useState } from "react";
import styled from "styled-components";

const CocktailIngredient = () => {
  const { data: ingredients } = useIngredients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredIngredients = useMemo(() => {
    if (!ingredients) {
      return [];
    }

    const search = searchValue.toLowerCase();

    return ingredients.filter(({ nameEn }) => nameEn.toLowerCase().includes(search));
  }, [ingredients, searchValue]);

  if (!ingredients) {
    return null;
  }

  return (
    <div>
      <StyledInput
        label="name"
        name="name"
        value=''
        onChange={({ currentTarget }) => setSearchValue(currentTarget.value)}
        readOnly
        onClick={() => setIsModalOpen(true)}
      />

      <StyledModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Search ingredient"
      >
        <SearchBar
          placeholder="Search ingredient"
          onChange={({ currentTarget }) => setSearchValue(currentTarget.value)}
          value={searchValue}
        />
        <IngredientsWrapper>
          {filteredIngredients.map(({ _id, nameEn, image, tags }) => (
            <Ingredient key={_id}>
              <Image image={image || ''} />
              <Content>
                <Name>
                  {nameEn}
                </Name>
                <Tags>
                  {tags.map((tag) => (
                    <TagButton key={tag} tag={tag} isIngredient />
                  ))}
                </Tags>
              </Content>
            </Ingredient>
          ))}
        </IngredientsWrapper>
      </StyledModal>
    </div>
  )
}

export default CocktailIngredient;

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




