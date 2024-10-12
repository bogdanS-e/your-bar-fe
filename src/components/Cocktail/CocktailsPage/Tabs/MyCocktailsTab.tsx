import { useUser } from "components/AuthHandler";
import Head from "next/head";
import { useMemo } from "react";
import { CocktailTag, ICocktail } from "types/cocktail";
import Cocktails from "../Cocktails";
import { useAvailableCocktailsSet } from "hooks";
import useCocktails from "../useCocktails";

interface IMyCocktailsProps {
  initialData: ICocktail[];
  selectedTags: CocktailTag[];
  selectedIngredients: string[];
}

const MyCocktailsTab = (props: IMyCocktailsProps) => {
  const { data: user } = useUser();
  const { data: cocktails } = useCocktails();
  const availableCocktailsSet = useAvailableCocktailsSet();

  const availableCocktails = useMemo(() => {
    if (!availableCocktailsSet.size || !cocktails) {
      return [];
    }

    const res: ICocktail[] = [];

    for (const cocktail of cocktails) {
      if (availableCocktailsSet.has(cocktail._id)) {
        res.push(cocktail);
      }
    }

    return res;
  }, [availableCocktailsSet, cocktails]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>My Cocktails | Your Bar</title>
      </Head>
      <Cocktails
        {...props}
        cocktails={availableCocktails}
      />
    </>
  )
}

export default MyCocktailsTab;