import IconButton from 'components/IconButton';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, ImageCircle } from 'styles/components';
import { CheckmarkButton } from 'components/Button';

export interface ISearchCardProps {
  href: string;
  name: string;
  image: string | null;
  isAvailable?: boolean;
  onIconClick?: () => void;
}

const SearchCard = ({ href, image, name, isAvailable = false, onIconClick }: ISearchCardProps) => {
  return (
    <CardContainer prefetch={false} href={href} $isAvailable={isAvailable}>
      <Row $gap="20px">
        <ImageCircle src={image || ''} width={80} height={80} alt={name} />
        <TitleWrapper $justifyContent="space-between">
          <Title>{name}</Title>

          {onIconClick && <CheckmarkButton isActive={isAvailable} onClick={onIconClick} />}
        </TitleWrapper>
      </Row>
    </CardContainer>
  );
};

export default SearchCard;

const CardContainer = styled(Link)<{ $isAvailable: boolean }>`
  display: block;
  padding: 8px 12px;
  background: ${({ $isAvailable, theme }) =>
    $isAvailable ? theme.color.availableBackground : 'none'};
`;

const TitleWrapper = styled(Row)`
  width: 100%;
`;

const Title = styled.span`
  font-size: 1.125rem;
`;
