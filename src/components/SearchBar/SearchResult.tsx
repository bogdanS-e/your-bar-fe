import Link from 'next/link';
import useStore from 'store';
import styled from 'styled-components';
import { ImageCircle, Row } from 'styles/components';

interface ISearchResultProps {
  resultId: string;
}

const SearchResult = ({ resultId }: ISearchResultProps) => {
  const object = useStore(({ getObjectById }) => getObjectById(resultId));

  if (!object) {
    return null;
  }

  const { nameEn, image, slug } = object;
  //cocktails have ingredients
  const url =
    'ingredients' in object ? `/cocktail/${slug}` : `/ingredient/${slug}`;

  return (
    <Link prefetch={false} href={url}>
      <Row $gap="20px">
        <ImageCircle src={image || ''} width={80} height={80} alt={nameEn} />
        <Title>{nameEn}</Title>
      </Row>
    </Link>
  );
};

export default SearchResult;

const Title = styled.span`
  font-size: 1.125rem;
`;
