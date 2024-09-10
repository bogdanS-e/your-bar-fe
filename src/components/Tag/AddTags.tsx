import Dropdown from 'components/Dropdown';
import IconButton from 'components/IconButton';
import styled from 'styled-components';
import { IngredientTag } from '../../types/ingredient';
import { useMemo } from 'react';
import TagButton from './TagButton';
import { CocktailTag } from 'types/cocktail';

interface IAddTagsProps<T> {
  selectedTags: T[];
  allTags: T[];
  onChange: (newTags: T[]) => void;
  isIngredient: boolean; //add tags for ingredient or cocktail
  className?: string;
}

const AddTags = <T extends IngredientTag | CocktailTag>({
  selectedTags,
  allTags,
  isIngredient,
  className,
  onChange,
}: IAddTagsProps<T>) => {
  const availableTags = useMemo(() => {
    return allTags.filter((tag) => !selectedTags.includes(tag));
  }, [selectedTags]);

  const addTag = (tag: T) => {
    onChange([...selectedTags, tag]);
  };

  const removeTag = (tagToRemove: T) => {
    onChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Container className={className}>
      {selectedTags.map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          isIngredient={isIngredient}
          onRemove={tag === IngredientTag.Custom ? undefined : removeTag}
        />
      ))}

      <Dropdown
        trigger={
          <IconButton size={30}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M4 12H20M12 4V20"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </IconButton>
        }
        onOptionClick={addTag}
        items={availableTags}
        renderItem={(tag) => (
          <TagButton tag={tag} isIngredient={isIngredient} />
        )}
      />
    </Container>
  );
};

export default AddTags;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
