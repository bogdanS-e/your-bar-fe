import { IngredientTag, ingredientTagInfo } from 'types/ingredient';
import { StateCreator } from 'zustand';

export interface IIngredientsFilterStoreProps {
  selectedIngredientTags: IngredientTag[];
  activeIngredientTab: number;
}

export interface IIngredientsFilterStoreActions {
  setSelectedIngredientTags: (selectedIngredientTags: IngredientTag[]) => void;
  setActiveIngredientTab: (activeIngredientTab: number) => void;
}

export type TIngredientsFilterSlice = IIngredientsFilterStoreProps & IIngredientsFilterStoreActions;

const initialData: IIngredientsFilterStoreProps = {
  selectedIngredientTags: Object.values(ingredientTagInfo).map(({ key }) => key),
  activeIngredientTab: 0,
};

const createIngredientsFilterSlice: StateCreator<TIngredientsFilterSlice> = (set) => ({
  ...initialData,
  setSelectedIngredientTags: (selectedIngredientTags) => set({ selectedIngredientTags }),
  setActiveIngredientTab: (activeIngredientTab) => set({ activeIngredientTab }),
});

export default createIngredientsFilterSlice;
