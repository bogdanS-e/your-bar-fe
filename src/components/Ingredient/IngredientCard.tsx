// components/IngredientCard.tsx
import TagButton from 'components/Tag/TagButton';
import React from 'react';
import styled from 'styled-components';
import { IngredientTag } from 'types/ingredient';

interface IngredientCardProps {
  image: string | null;
  name: string;
  description: string;
  tags: IngredientTag[];
  className?: string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  image,
  name,
  description,
  tags,
  className,
}) => {
  return (
    <Card className={className}>
      <ImageWrapper>
        <Image src={image || ''} alt={name} />
      </ImageWrapper>
      <Content>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <TagsWrapper>
          {tags.map((tag) => (
            <TagButton key={tag} tag={tag} isIngredient />
          ))}
        </TagsWrapper>
      </Content>
    </Card>
  );
};

export default IngredientCard;

const Card = styled.div`
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const Content = styled.div`
  padding: 16px;
  background-color: white;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin: 0;
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagsWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
