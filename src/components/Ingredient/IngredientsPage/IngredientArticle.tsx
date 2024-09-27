import Card from 'components/Card';
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
        {ingredients.map(({ _id, nameEn, descriptionEn, image, tags }) => (
          <Card
            key={_id}
            href={`ingredient/${_id}`}
            name={nameEn}
            description={descriptionEn}
            image={image}
            tags={tags}
          />
        ))}
      </Row>
    </Article>
  );
};

export default IngredientArticle;

const Article = styled.article`
  display: block;
`;

const Title = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
  color: #8f8f8f;
  margin: 40px 0 20px;
`;
