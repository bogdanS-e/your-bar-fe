import { useMemo } from 'react';
import { useUser } from 'components/AuthHandler';
import { useCocktails } from 'components/Cocktail';

const useAvailableCocktailsSet = (): Set<String> => {
  const { data: user } = useUser();
  const { data: cocktails } = useCocktails();

  const availableCocktailsSet = useMemo(() => {
    const set = new Set<string>();

    if (!user || !cocktails) {
      return set;
    }

    const availableIngredientsSet = new Set(user.ingredients);

    for (const cocktail of cocktails) {
      let isAvailable = true;

      for (const { ingredientId, isDecoration, isOptional } of cocktail.ingredients) {
        if (isDecoration || isOptional) {
          continue;
        }

        if (!availableIngredientsSet.has(ingredientId)) {
          isAvailable = false;

          break;
        }
      }

      if (isAvailable) {
        set.add(cocktail._id);
      }
    }

    return set;
  }, [user, cocktails]);

  return availableCocktailsSet;
};

export default useAvailableCocktailsSet;
