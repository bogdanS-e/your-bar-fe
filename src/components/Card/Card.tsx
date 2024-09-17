import TagButton from 'components/Tag/TagButton';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Row } from 'styles/components';
import { CocktailTag } from 'types/cocktail';
import { IngredientTag } from 'types/ingredient';

interface ICardProps {
  image: string | null;
  name: string;
  description: string;
  tags: (IngredientTag | CocktailTag)[];
  href: string;
  ingredients?: string[];
  className?: string;
}

const Card = ({
  image,
  name,
  description,
  tags,
  href,
  ingredients,
  className,
}: ICardProps) => {
  return (
    <CardContainer className={className} href={href} prefetch={false}>
      <ImageWrapper $justifyContent="center">
        <Image src={image || ''} alt={name} />
      </ImageWrapper>
      <Content>
        <Title>{name}</Title>
        <Description>{description}</Description>

        {!!ingredients?.length && (
          <Ingredients>
            {ingredients.map((ingredient) => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </Ingredients>
        )}

        <TagsWrapper>
          {tags.map((tag) => (
            <TagButton
              key={tag}
              tag={tag}
              isIngredient={!ingredients?.length}
            />
          ))}
        </TagsWrapper>
      </Content>
    </CardContainer>
  );
};

export default Card;

const Ingredients = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #aaa;

  span:not(:last-child) {
    &:after {
      content: ',  ';
      white-space: pre;
    }
  }
`;
const gap = '20px';
const CardContainer = styled(Link)`
  display: block;
  width: calc((100% - 4 * ${gap}) / 5);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled(Row)`
  width: 100%;
  height: 150px;
  padding-top: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  border-radius: 5px;
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
