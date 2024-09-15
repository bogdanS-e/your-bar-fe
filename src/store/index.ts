import { IIngredient } from 'types/ingredient';
import { create } from 'zustand';

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
