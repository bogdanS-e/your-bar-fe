import {
  IIngredient,
  IngredientTag,
  ingredientTagInfo,
} from 'types/ingredient';
import useIngredients from './useIngredients';
import IngredientCard from './IngredientCard';
import styled from 'styled-components';
import { useMemo } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  }, [selectedTags.length, data]);

  const renderArticles = () => {
    const articles = [];

    for (const [tag, ingredients] of dataMap.entries()) {
      if (!ingredients.length) {
        continue;
      }

      articles.push(
        <CSSTransition
          key={tag}
          timeout={{ enter: 1000, exit: 300 }}
          classNames="article"
        >
          <Article>
            <Title>{ingredientTagInfo[tag].title}</Title>
            <IngredientsWrapper>
              {ingredients.map(
                ({ _id, nameEn, descriptionEn, image, tags }) => (
                  <StyledIngredientCard
                    key={_id}
                    name={nameEn}
                    description={descriptionEn}
                    image={image}
                    tags={tags}
                  />
                )
              )}
            </IngredientsWrapper>
          </Article>
        </CSSTransition>
      );
    }

    return <TransitionGroup component={null}>{articles}</TransitionGroup>;
  };

  return <Container>{renderArticles()}</Container>;
};

export default IngredientsList;

const gap = '20px';

const IngredientsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${gap};
`;

const Article = styled.article`
  display: block;
`;

const Title = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
  color: #8f8f8f;
  margin: 40px 0 20px;
`;

const Container = styled.section``;

const StyledIngredientCard = styled(IngredientCard)`
  width: calc((100% - 4 * ${gap}) / 5);
`;
