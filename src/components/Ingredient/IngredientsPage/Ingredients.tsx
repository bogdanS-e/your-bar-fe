import { IIngredient, IngredientTag, ingredientTagInfo } from 'types/ingredient';
import useIngredients from './useIngredients';
import { useMemo } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import IngredientArticle from './IngredientArticle';

interface IIngredientsProps {
  initialData: IIngredient[];
  selectedTags: IngredientTag[];
  ingredients?: IIngredient[];
}

const Ingredients = ({ initialData, selectedTags, ingredients }: IIngredientsProps) => {
  const { data: queryData } = useIngredients();
  const data = ingredients || queryData || initialData;

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
        <CSSTransition key={tag} timeout={{ enter: 1000, exit: 300 }} classNames="article">
          <IngredientArticle ingredients={ingredients} title={ingredientTagInfo[tag].title} />
        </CSSTransition>
      );
    }

    return <TransitionGroup component={null}>{articles}</TransitionGroup>;
  };

  return <section>{renderArticles()}</section>;
};

export default Ingredients;
