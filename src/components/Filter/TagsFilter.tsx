import styled from 'styled-components';

export interface IFilterItem<T> {
  image: string;
  title: string;
  key: T;
}

interface IFilterProps<T> {
  items: IFilterItem<T>[];
  selectedTags: T[];
  onChange: (selectedItems: T[]) => void;
}

const TagsFilter = <T extends string | number>({
  items,
  selectedTags,
  onChange,
}: IFilterProps<T>) => {
  const handleClick = (key: T) => {
    if (selectedTags.includes(key)) {
      onChange(selectedTags.filter((value) => value !== key));

      return;
    }

    onChange([...selectedTags, key]);
  };

  const handleSelectAll = () => {
    onChange(items.map(({ key }) => key));
  };

  return (
    <Container>
      {items.map(({ title, key, image }) => (
        <Item key={key} onClick={() => handleClick(key)}>
          <ImageWrapper>
            <StyledImage
              src={image}
              width={80}
              height={80}
              alt="Filter image"
            />
            <Selected $isSelected={selectedTags.includes(key)} />
          </ImageWrapper>

          {title}
        </Item>
      ))}

      <Item key="select-all" onClick={handleSelectAll}>
        <ImageWrapper>
          <StyledImage
            src="/images/checkmark.jpg"
            width={80}
            height={80}
            alt="Checkmark image"
          />
        </ImageWrapper>
        Select all
      </Item>
    </Container>
  );
};

export default TagsFilter;

const Container = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
  color: #8f8f8f;
  font-style: italic;
  text-align: center;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  align-items: center;
  cursor: pointer;
  flex: 1;
  max-width: 80px;
`;

const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  margin-bottom: 5px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  margin-bottom: 8px;
  object-fit: cover;
`;

const Selected = styled.span<{ $isSelected: boolean }>`
  transition: border 0.15s linear;
  border: ${({ $isSelected }) => ($isSelected ? '5px' : '0')} solid #90caf8;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  position: absolute;
  top: 0;
  left: -1px;
  border-radius: 50%;
  display: block;

  &:before {
    content: '✔';
    transition: opacity 0.15s linear;
    background-color: #90caf8;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: block;
    position: absolute;
    right: -5%;
    top: -5%;
    color: #080808a8;
    opacity: ${({ $isSelected }) => ($isSelected ? '1' : '0')};
  }
`;