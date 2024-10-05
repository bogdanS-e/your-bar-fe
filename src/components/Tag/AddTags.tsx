import Dropdown from 'components/Dropdown';
import IconButton from 'components/IconButton';
import styled from 'styled-components';
import { IngredientTag } from '../../types/ingredient';
import { useMemo } from 'react';
import TagButton from './TagButton';
import { CocktailTag } from 'types/cocktail';
import { PlusIcon } from 'components/Icons';

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
  }, [selectedTags, allTags]);

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
            <PlusIcon />
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
