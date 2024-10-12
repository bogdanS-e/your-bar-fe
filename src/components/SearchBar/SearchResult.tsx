import { useUser } from 'components/AuthHandler';
import Link from 'next/link';
import useStore from 'store';
import styled from 'styled-components';
import { ImageCircle, Row } from 'styles/components';
import SearchCard from './SearchCard';
import IngredientResult from './IngredientResult';
import CocktailResult from './CocktailResult';

interface ISearchResultProps {
  resultId: string;
}

const SearchResult = ({ resultId }: ISearchResultProps) => {
  const object = useStore(({ getObjectById }) => getObjectById(resultId));

  if (!object) {
    return null;
  }

  const { nameEn, image, slug } = object;

  //only cocktails have ingredients
  const isCocktail = 'ingredients' in object;
  const href = isCocktail ? `/cocktail/${slug}` : `/ingredient/${slug}`;

  if (isCocktail) {
    return <CocktailResult href={href} name={nameEn} image={image} cocktailId={resultId} />;
  }

  return <IngredientResult href={href} name={nameEn} image={image} ingredientId={resultId} />;
};

export default SearchResult;
