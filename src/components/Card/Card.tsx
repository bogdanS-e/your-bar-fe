import { CheckmarkButton, HeartButton } from 'components/Button';
import TagButton from 'components/Tag/TagButton';
import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'styles/components';
import Typography from 'styles/Typography';
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
  Icon: ReactNode;
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
  Icon,
}: ICardProps) => {
  return (
    <CardContainer $isAvailable={isAvailable} className={className} href={href} prefetch={false}>
      <ImageWrapper $justifyContent="center">
        <StyledImage width={200} height={140} src={image || ''} alt={name} />
      </ImageWrapper>
      <IconWrapper>{Icon}</IconWrapper>
      <Content>
        <div style={{ width: '100%' }}>
          <Typography variant="h5" as="h3">
            {name}
          </Typography>
          <Typography variant="subtitle1">
            <Description>{description}</Description>

            {!!ingredients?.length && (
              <Ingredients>
                {ingredients.map((ingredient) => (
                  <span key={ingredient}>{ingredient}</span>
                ))}
              </Ingredients>
            )}
          </Typography>
        </div>

        <TagsWrapper>
          {tags.map((tag) => (
            <TagButton key={tag} tag={tag} isIngredient={!ingredients?.length} />
          ))}
        </TagsWrapper>
      </Content>
    </CardContainer>
  );
};

export default Card;

const IconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    top: unset;
  }
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
const columns = {
  xl: 5,
  lg: 3,
  sm: 1,
};
const CardContainer = styled(Link)<{ $isAvailable: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc((100% - ${columns.xl - 1} * ${gap}) / ${columns.xl});
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  background: ${({ $isAvailable, theme }) =>
    $isAvailable ? theme.color.availableBackground : 'none'};
  transition:
    background 0.5s,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: calc((100% - ${columns.lg - 1} * ${gap}) / ${columns.lg});
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: calc((100% - ${columns.sm - 1} * ${gap}) / ${columns.sm});
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 5px;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  }
`;

const ImageWrapper = styled(Row)`
  width: 100%;
  height: 150px;
  padding-top: 10px;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down('md')} {
    height: 100px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    padding: 0;
  }
`;

const StyledImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  border-radius: 5px;
`;

const Content = styled(Column)`
  padding: 16px;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 8px;
  }
`;

const Description = styled.p`
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.breakpoints.down('md')} {
    margin: 0;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;

const TagsWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  align-self: self-start;
  flex-wrap: wrap;
  gap: 10px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 5px;
  }
`;
