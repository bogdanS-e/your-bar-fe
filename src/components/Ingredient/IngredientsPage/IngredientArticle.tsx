import { IngredientCard } from 'components/Card';
import styled from 'styled-components';
import { Row } from 'styles/components';

import { IIngredient } from 'types/ingredient';

interface IIngredientArticleProps {
  ingredients: IIngredient[];
  title: string;
}

const IngredientArticle = ({ ingredients, title }: IIngredientArticleProps) => {
  return (
    <Article>
      <Title>{title}</Title>
      <Row $gap="20px" $flexWrap="wrap" $alignItems="stretch">
        {ingredients.map(
          ({ _id, slug, nameEn, descriptionEn, image, tags }) => (
            <IngredientCard
              key={_id}
              ingredientId={_id}
              href={`ingredient/${slug}`}
              name={nameEn}
              description={descriptionEn}
              image={image}
              tags={tags}
            />
          )
        )}
      </Row>
    </Article>
  );
};

export default IngredientArticle;

const Article = styled.article`
  display: block;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-weight: 400;
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #8f8f8f;
`;
