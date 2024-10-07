import Head from 'next/head';
import styled from 'styled-components';
import { useMemo } from 'react';
import { CocktailTag, cocktailTagInfo, ICocktail } from 'types/cocktail';
import useCocktails from '../useCocktails';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Row } from 'styles/components';
import Card from 'components/Card';
import useStore from 'store';

interface IIngredientsPageProps {
  initialData: ICocktail[];
  selectedTags: CocktailTag[];
  selectedIngredients: string[];
}

const AllCocktailsTab = ({
  initialData,
  selectedTags,
  selectedIngredients,
}: IIngredientsPageProps) => {
  const { data: queryData } = useCocktails();
  const data = queryData || initialData;

  const { getIngredientsName } = useStore();

  const dataMap = useMemo(() => {
    const map = new Map<CocktailTag, ICocktail[]>();
    for (const { key } of Object.values(cocktailTagInfo)) {
      map.set(key, []);
    }

    const filteredData: ICocktail[] = [];

    //filter coctails by ingredients
    for (const cocktail of data) {
      let found = true;

      for (const id of selectedIngredients) {
        if (!cocktail.ingredients.find(({ ingredientId }) => ingredientId === id)) {
          found = false;

          break;
        }
      }

      if (found) {
        filteredData.push(cocktail);
      }
    }

    //filter coctails by tags
    for (const cocktail of filteredData) {
      for (const tag of cocktail.tags) {
        if (!selectedTags.includes(tag)) {
          continue;
        }

        const mapped = map.get(tag);

        if (!mapped) {
          throw new Error(`Unknown tag ${tag}`);
        }

        mapped.push(cocktail);
      }
    }

    return map;
  }, [selectedTags, selectedIngredients, data]);

  const renderArticles = () => {
    const articles = [];

    for (const [tag, cocktails] of dataMap.entries()) {
      if (!cocktails.length) {
        continue;
      }

      articles.push(
        <CSSTransition key={tag} timeout={{ enter: 1000, exit: 300 }} classNames="article">
          <Article>
            <Title>{cocktailTagInfo[tag].title}</Title>
            <Row $gap="20px" $flexWrap="wrap" $alignItems="stretch">
              {cocktails.map(({ _id, slug, nameEn, descriptionEn, image, tags, ingredients }) => (
                <Card
                  key={_id}
                  name={nameEn}
                  description={descriptionEn}
                  image={image}
                  tags={tags}
                  href={`cocktail/${slug}`}
                  ingredients={getIngredientsName(ingredients)}
                />
              ))}
            </Row>
          </Article>
        </CSSTransition>
      );
    }

    return <TransitionGroup component={null}>{articles}</TransitionGroup>;
  };

  return (
    <>
      <Head>
        <title>All Cocktails | Your Bar</title>
      </Head>
      <section>{renderArticles()}</section>
    </>
  );
};

export default AllCocktailsTab;

const Article = styled.article`
  display: block;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  color: #8f8f8f;
  margin-bottom: 10px;
`;
