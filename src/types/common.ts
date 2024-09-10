import { CocktailTag } from './cocktail';
import { IngredientTag } from './ingredient';

export interface IResError {
  error: string;
}

export interface ITagInfo<T extends CocktailTag | IngredientTag> {
  color: string;
  title: string;
  image: string;
  key: T;
}
