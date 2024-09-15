import { ICocktail, ICocktailIngredient } from 'types/cocktail';
import { IIngredient } from 'types/ingredient';
import { create } from 'zustand';

// from BE we get arrays of ingredient & cocktail
// store will store Map<objId, obj> for search optimization
// Find cocktail & ingredient by id in O(1)
interface IStoreProps {
  ingredientsMap: Map<string, IIngredient>;
  cocktaisMap: Map<string, ICocktail>;
}

interface IActionsProps {
  updateIngredients: (ingredients: IIngredient[]) => void;
  updateCocktails: (ingredients: ICocktail[]) => void;
  getIngredientsName: (cocktailIngredients: ICocktailIngredient[]) => string[];
  getObjectById: (id: string) => IIngredient | ICocktail | null;
}

const useStore = create<IStoreProps & IActionsProps>()((set, get) => ({
  ingredientsMap: new Map(),
  cocktaisMap: new Map(),
  updateIngredients: (ingredients) => {
    const ingredientsMap = new Map<string, IIngredient>();

    for (const ingredient of ingredients) {
      ingredientsMap.set(ingredient._id, ingredient);
    }

    set({ ingredientsMap });
  },
  updateCocktails: (cocktails) => {
    const cocktaisMap = new Map<string, ICocktail>();

    for (const cocktail of cocktails) {
      cocktaisMap.set(cocktail._id, cocktail);
    }

    set({ cocktaisMap });
  },
  getIngredientsName: (cocktailIngredients) => {
    const { ingredientsMap } = get();

    if (!ingredientsMap.size) {
      return ['ingredient name'];
    }

    const ingredientsName: string[] = [];

    for (let i = 0; i < 3; i++) {
      const { ingredientId } = cocktailIngredients[i];

      const { nameEn } = ingredientsMap.get(ingredientId) || {};

      if (!nameEn) {
        continue;
      }

      ingredientsName.push(nameEn);
    }

    return ingredientsName;
  },
  getObjectById: (id) => {
    const { ingredientsMap, cocktaisMap } = get();
    console.log(ingredientsMap, cocktaisMap);

    console.log(id, ingredientsMap.get(id) || cocktaisMap.get(id) || null);

    return ingredientsMap.get(id) || cocktaisMap.get(id) || null;
  },
}));

export default useStore;
