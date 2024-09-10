import { useState } from "react";
import CocktailIngredient from "./CocktailIngredient";

const AddIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  
  return (
    <CocktailIngredient />
  )
}

export default AddIngredients;
