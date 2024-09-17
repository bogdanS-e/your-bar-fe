import Link from 'next/link';
import useStore from 'store';
import styled from 'styled-components';
import { Row } from 'styles/components';

interface ISearchResultProps {
  resultId: string;
}

const SearchResult = ({ resultId }: ISearchResultProps) => {
  const object = useStore(({ getObjectById }) => getObjectById(resultId));

  if (!object) {
    return null;
  }

  const { nameEn, image } = object;
  //cocktails have ingredients
  const url =
    'ingredients' in object
      ? `/cocktail/${resultId}`
      : `/ingredient/${resultId}`;

  return (
    <Link prefetch={false} href={url}>
      <Row $gap="20px">
        <Image url={image || ''} />
        <Title>{nameEn}</Title>
      </Row>
    </Link>
  );
};

export default SearchResult;

const Image = styled.span<{ url: string }>`
  width: 80px;
  aspect-ratio: 1 / 1;
  background: #f0f0f0 url(${({ url }) => url}) no-repeat center;
  background-size: contain;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

const Title = styled.span`
  font-size: 1.125rem;
`;
