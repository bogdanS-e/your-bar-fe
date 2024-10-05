import { IngredientTag, ingredientTagInfo } from '../../types/ingredient';
import { CocktailTag, cocktailTagInfo } from 'types/cocktail';
import { useMemo } from 'react';
import { ChipButton } from 'components/Button';

interface ITagProps<T> {
  tag: T;
  isIngredient: boolean;
  onRemove?: (tag: T) => void;
}

const TagButton = <T extends IngredientTag | CocktailTag>({
  tag,
  isIngredient,
  onRemove,
}: ITagProps<T>) => {
  const { color, title } = useMemo(() => {
    if (isIngredient) {
      return ingredientTagInfo[tag as IngredientTag];
    }

    return cocktailTagInfo[tag as CocktailTag];
  }, [tag, isIngredient]);

  return (
    <ChipButton color={color} onRemove={onRemove && (() => onRemove(tag))}>
      {title}
    </ChipButton>
  );
};

export default TagButton;
