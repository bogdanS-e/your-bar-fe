import Link from 'next/link';
import styled from 'styled-components';
import { Row, ImageCircle } from 'styles/components';
import { ReactNode } from 'react';
import Typography from 'styles/Typography';

export interface ISearchCardProps {
  href: string;
  name: string;
  image: string | null;
  Icon: ReactNode;
  isAvailable?: boolean;
}

const SearchCard = ({ href, image, name, isAvailable = false, Icon }: ISearchCardProps) => {
  return (
    <CardContainer prefetch={false} href={href} $isAvailable={isAvailable}>
      <Row $gap="20px">
        <ImageCircle src={image || ''} width={80} height={80} alt={name} />
        <Row $justifyContent="space-between" $fullWidth>
          <Typography variant="body1" as="div">
            {name}
          </Typography>

          {Icon}
        </Row>
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

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 4px 6px;
  }
`;
