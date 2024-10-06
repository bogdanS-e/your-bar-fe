import IconButton from 'components/IconButton';
import { CheckmarkIcon } from 'components/Icons';
import TagButton from 'components/Tag/TagButton';
import Link from 'next/link';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'styles/components';
import { CocktailTag } from 'types/cocktail';
import { IngredientTag } from 'types/ingredient';

export interface ICardProps {
  image: string | null;
  name: string;
  description: string;
  tags: (IngredientTag | CocktailTag)[];
  href: string;
  isAvailable?: boolean;
  ingredients?: string[];
  className?: string;
  onIconClick?: () => void;
}

const Card = ({
  image,
  name,
  description,
  tags,
  href,
  isAvailable = false,
  ingredients,
  className,
  onIconClick,
}: ICardProps) => {
  const handleIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onIconClick?.();
  };

  return (
    <CardContainer
      $isAvailable={isAvailable}
      className={className}
      href={href}
      prefetch={false}
    >
      <ImageWrapper $justifyContent="center">
        <StyledImage width={200} height={140} src={image || ''} alt={name} />
      </ImageWrapper>

      {onIconClick && (
        <StyledIconButton
          size={40}
          $isAvailable={isAvailable}
          onClick={handleIconClick}
        >
          <CheckmarkIcon />
        </StyledIconButton>
      )}

      <Content>
        <div style={{ width: '100%' }}>
          <Title>{name}</Title>
          <Description>{description}</Description>

          {!!ingredients?.length && (
            <Ingredients>
              {ingredients.map((ingredient) => (
                <span key={ingredient}>{ingredient}</span>
              ))}
            </Ingredients>
          )}
        </div>

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

const StyledIconButton = styled(IconButton)<{ $isAvailable: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
  color: ${({ $isAvailable }) => ($isAvailable ? '#4CAF50' : '#ccc')};
`;

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
const CardContainer = styled(Link)<{ $isAvailable: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc((100% - 4 * ${gap}) / 5);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  background: ${({ $isAvailable }) => ($isAvailable ? '#E8F5E9' : 'none')};
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

const StyledImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  border-radius: 5px;
`;

const Content = styled(Column)`
  padding: 16px;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
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
