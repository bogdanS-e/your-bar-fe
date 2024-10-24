import { IngredientCard } from 'components/Card';
import styled from 'styled-components';
import { Row } from 'styles/components';
import Typography from 'styles/Typography';

import { IIngredient } from 'types/ingredient';

interface IIngredientArticleProps {
  ingredients: IIngredient[];
  title: string;
}

const IngredientArticle = ({ ingredients, title }: IIngredientArticleProps) => {
  return (
    <Article>
      <Title variant="h4" as="h2">
        {title}
      </Title>
      <Row $gap="20px" $sm-gap="0" $flexWrap="wrap" $alignItems="stretch">
        {ingredients.map(({ _id, slug, nameEn, descriptionEn, image, tags }) => (
          <IngredientCard
            key={_id}
            ingredientId={_id}
            href={`ingredient/${slug}`}
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
  margin-bottom: 20px;
`;

const Title = styled(Typography)`
  font-weight: 400;
  margin-bottom: 10px;
  color: #8f8f8f;
`;
