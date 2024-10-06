import { MouseEvent } from 'react';
import IconButton from 'components/IconButton';
import { CheckmarkIcon } from 'components/Icons';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, ImageCircle } from 'styles/components';

export interface ISearchCardProps {
  href: string;
  name: string;
  image: string | null;
  isAvailable?: boolean;
  onIconClick?: () => void;
}

const SearchCard = ({
  href,
  image,
  name,
  isAvailable = false,
  onIconClick,
}: ISearchCardProps) => {
  const handleIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onIconClick?.();
  };

  return (
    <CardContainer prefetch={false} href={href} $isAvailable={isAvailable}>
      <Row $gap="20px">
        <ImageCircle src={image || ''} width={80} height={80} alt={name} />
        <TitleWrapper $justifyContent="space-between">
          <Title>{name}</Title>

          {onIconClick && (
            <StyledIconButton
              size={40}
              $isAvailable={isAvailable}
              onClick={handleIconClick}
            >
              <CheckmarkIcon />
            </StyledIconButton>
          )}
        </TitleWrapper>
      </Row>
    </CardContainer>
  );
};

export default SearchCard;

const CardContainer = styled(Link)<{ $isAvailable: boolean }>`
  display: block;
  padding: 8px 12px;

  background: ${({ $isAvailable }) => ($isAvailable ? '#E8F5E9' : 'none')};
`;

const TitleWrapper = styled(Row)`
  width: 100%;
`;

const Title = styled.span`
  font-size: 1.125rem;
`;

const StyledIconButton = styled(IconButton)<{ $isAvailable: boolean }>`
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
  color: ${({ $isAvailable }) => ($isAvailable ? '#4CAF50' : '#ccc')};
`;
