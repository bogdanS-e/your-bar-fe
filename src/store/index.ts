import { create } from 'zustand';
import createObjectsSlice, { TObjectsSlice } from './objectsSlice';
import createUiSlice, { TUISlice } from './uiSlice';
import createIngredientsFilterSlice, { TIngredientsFilterSlice } from './ingredientsFilterSlice';
import createCocktailsFilterSlice, { TCocktailsFilterSlice } from './cocktailsFilterSlice';

const useStore = create<
  TObjectsSlice & TUISlice & TIngredientsFilterSlice & TCocktailsFilterSlice
>()((...a) => ({
  ...createUiSlice(...a),
  ...createObjectsSlice(...a),
  ...createIngredientsFilterSlice(...a),
  ...createCocktailsFilterSlice(...a),
}));

export default useStore;
