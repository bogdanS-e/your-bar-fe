import {
  IIngredient,
  IngredientTag,
  ingredientTagInfo,
} from 'types/ingredient';
import useIngredients from './useIngredients';
import { useMemo } from 'react';
import { TransitionGroup } from 'react-transition-group';
import IngredientArticle from './IngredientArticle';

interface IIngredientsListProps {
  initialData: IIngredient[];
  selectedTags: IngredientTag[];
}

const IngredientsList = ({
  initialData,
  selectedTags,
}: IIngredientsListProps) => {
  const { data: queryData } = useIngredients();
  const data = queryData || initialData;

  const dataMap = useMemo(() => {
    const map = new Map<IngredientTag, IIngredient[]>();
    for (const { key } of Object.values(ingredientTagInfo)) {
      map.set(key, []);
    }

    for (const ingredient of data) {
      for (const tag of ingredient.tags) {
        if (!selectedTags.includes(tag)) {
          continue;
        }

        const mapped = map.get(tag);

        if (!mapped) {
          throw new Error(`Unknown tag ${tag}`);
        }

        mapped.push(ingredient);
      }
    }

    return map;
  }, [selectedTags, data]);

  const renderArticles = () => {
    const articles = [];

    for (const [tag, ingredients] of dataMap.entries()) {
      if (!ingredients.length) {
        continue;
      }

      articles.push(
        <IngredientArticle
          key={tag}
          ingredients={ingredients}
          title={ingredientTagInfo[tag].title}
        />
      );
    }

    return <TransitionGroup component={null}>{articles}</TransitionGroup>;
  };

  return <section>{renderArticles()}</section>;
};

export default IngredientsList;
