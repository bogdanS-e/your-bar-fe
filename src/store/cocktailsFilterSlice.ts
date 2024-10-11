import { CocktailTag, cocktailTagInfo } from 'types/cocktail';
import { StateCreator } from 'zustand';

export interface ICocktailsFilterStoreProps {
  selectedCocktailTags: CocktailTag[];
  activeCocktailTab: number;
  selectedIngredients: string[];
}

export interface ICocktailsFilterStoreActions {
  setSelectedCocktailTags: (selectedTags: CocktailTag[]) => void;
  setActiveCocktailTab: (activeCocktailTab: number) => void;
  setSelectedIngredients: (selectedIngredients: string[]) => void;
}

export type TCocktailsFilterSlice = ICocktailsFilterStoreProps & ICocktailsFilterStoreActions;

const initialData: ICocktailsFilterStoreProps = {
  selectedCocktailTags: Object.values(cocktailTagInfo).map(({ key }) => key),
  activeCocktailTab: 0,
  selectedIngredients: [],
};

const createCocktailsFilterSlice: StateCreator<TCocktailsFilterSlice> = (set) => ({
  ...initialData,
  setSelectedCocktailTags: (selectedCocktailTags) => set({ selectedCocktailTags }),
  setActiveCocktailTab: (activeCocktailTab) => set({ activeCocktailTab }),
  setSelectedIngredients: (selectedIngredients) => set({ selectedIngredients }),
});

export default createCocktailsFilterSlice;
