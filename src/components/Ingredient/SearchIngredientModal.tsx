import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Row } from 'styles/components';

import useIngredients from './IngredientsPage/useIngredients';

import Modal from 'components/Modal';
import SearchBar from 'components/SearchBar';
import TagButton from 'components/Tag/TagButton';

interface ISearchIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChoose: (ingredientId: string, ingredientName: string) => void;
  keepUnmount?: boolean;
}

const SearchIngredientModal = ({
  isOpen,
  onClose,
  onChoose,
  keepUnmount = true,
}: ISearchIngredientModalProps) => {
  const { data: allIngredients } = useIngredients();
  const parentRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const filteredIngredients = useMemo(() => {
    if (!allIngredients) {
      return [];
    }

    const search = searchValue.toLowerCase();

    return allIngredients.filter(({ nameEn }) =>
      nameEn.toLowerCase().includes(search)
    );
  }, [allIngredients, searchValue]);

  const rowVirtualizer = useVirtualizer({
    count: filteredIngredients.length,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => 120,
  });

  const onIngredientChange =
    (ingredientId: string, ingredientName: string) => () => {
      onClose();
      setSearchValue('');
      onChoose(ingredientId, ingredientName);
    };

  return (
    <StyledModal
      isOpen={isOpen}
      keepUnmount={keepUnmount}
      onClose={onClose}
      title="Search ingredient"
    >
      <SearchBarWrapper>
        <SearchBar
          autoFocus
          placeholder="Search ingredient"
          onChange={(newValue) => setSearchValue(newValue)}
          value={searchValue}
          hideResults
        />
      </SearchBarWrapper>
      <VirtualContainer ref={parentRef}>
        <IngredientsWrapper
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <VirtualItem
              key={virtualItem.key}
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <Ingredient
                onClick={onIngredientChange(
                  filteredIngredients[virtualItem.index]._id,
                  filteredIngredients[virtualItem.index].nameEn
                )}
              >
                <StyledImage
                  height={100}
                  width={100}
                  src={filteredIngredients[virtualItem.index].image || ''}
                  alt={filteredIngredients[virtualItem.index].nameEn}
                />
                <Content>
                  <Name>{filteredIngredients[virtualItem.index].nameEn}</Name>
                  <Row $gap="10px">
                    {filteredIngredients[virtualItem.index].tags.map((tag) => (
                      <TagButton key={tag} tag={tag} isIngredient />
                    ))}
                  </Row>
                </Content>
              </Ingredient>
            </VirtualItem>
          ))}

          {filteredIngredients.length === 0 &&
            'No ingredient match your search'}
        </IngredientsWrapper>
      </VirtualContainer>
    </StyledModal>
  );
};

export default SearchIngredientModal;

const VirtualContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const VirtualItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const SearchBarWrapper = styled.div`
  margin-right: 32px;
`;

const StyledModal = styled(Modal)`
  height: 90dvh;
  display: flex;
  flex-direction: column;
  padding-right: 0;

  .modal-header {
    padding-right: 32px;
  }
  .modal-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    margin: 0;
    overflow-y: auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const IngredientsWrapper = styled.div`
  position: relative;
`;

const Name = styled.div`
  font-size: 1.5rem;
`;

const Ingredient = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
  border-radius: 10px;
  height: 100px;
  transition: background-color 0.15s;

  &:hover {
    background-color: #eee;
  }
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
`;
