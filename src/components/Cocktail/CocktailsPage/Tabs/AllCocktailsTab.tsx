import Filter from 'components/Filter';
import Head from 'next/head';
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { CocktailTag, cocktailTagInfo, ICocktail } from 'types/cocktail';
import useCocktails from '../useCocktails';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Row } from 'styles/components';
import Card from 'components/Card';
import useStore from 'store';

interface IIngredientsPageProps {
  initialData: ICocktail[];
}

const cocktailsFilter = Object.values(cocktailTagInfo);

const AllCocktailsTab = ({ initialData }: IIngredientsPageProps) => {
  const { data: queryData } = useCocktails();
  const data = queryData || initialData;

  const { getIngredientsName } = useStore();

  const [selectedTags, setSelectedTags] = useState(
    cocktailsFilter.map(({ key }) => key)
  );

  const dataMap = useMemo(() => {
    const map = new Map<CocktailTag, ICocktail[]>();
    for (const { key } of Object.values(cocktailTagInfo)) {
      map.set(key, []);
    }

    for (const cocktail of data) {
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
  }, [selectedTags, data]);

  const renderArticles = () => {
    const articles = [];

    for (const [tag, cocktails] of dataMap.entries()) {
      if (!cocktails.length) {
        continue;
      }

      articles.push(
        <CSSTransition
          key={tag}
          timeout={{ enter: 1000, exit: 300 }}
          classNames="article"
        >
          <Article>
            <ArticleTitle>{cocktailTagInfo[tag].title}</ArticleTitle>
            <Row $gap="20px" $flexWrap="wrap" $alignItems="stretch">
              {cocktails.map(
                ({
                  _id,
                  slug,
                  nameEn,
                  descriptionEn,
                  image,
                  tags,
                  ingredients,
                }) => (
                  <Card
                    key={_id}
                    name={nameEn}
                    description={descriptionEn}
                    image={image}
                    tags={tags}
                    href={`cocktail/${slug}`}
                    ingredients={getIngredientsName(ingredients)}
                  />
                )
              )}
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
      <Main>
        <Title>Cocktails</Title>
        <Filter
          items={cocktailsFilter}
          selectedTags={selectedTags}
          onChange={setSelectedTags}
        />
        <section>{renderArticles()}</section>
      </Main>
    </>
  );
};

export default AllCocktailsTab;

const Main = styled.div`
  margin: 20px 0;
`;

const Article = styled.article`
  display: block;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  color: #8f8f8f;
  margin-bottom: 20px;
`;

const ArticleTitle = styled(Title)`
  margin: 40px 0 20px;
`;
