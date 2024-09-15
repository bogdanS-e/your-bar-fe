import { IIngredient } from 'types/ingredient';
import { create } from 'zustand';

// from BE we get arrays of ingredient & cocktail
// store will store Map<objId, obj> for search optimization
// Find cocktail & ingredient by id in O(1)
interface IStoreProps {
  ingredientsMap: Map<string, IIngredient>;
}

interface IActionsProps {
  updateIngredients: (ingredients: IIngredient[]) => void;
}

const useStore = create<IStoreProps & IActionsProps>()((set) => ({
  ingredientsMap: new Map(),
  updateIngredients: (ingredients) => {
    const ingredientsMap = new Map<string, IIngredient>();

    for (const ingredient of ingredients) {
      ingredientsMap.set(ingredient._id, ingredient);
    }

    set({ ingredientsMap });
  },
}));

export default useStore;
