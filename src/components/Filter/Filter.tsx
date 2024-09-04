import styled from "styled-components";

export interface IFilterItem<T extends string> {
  image: string;
  title: string;
  key: T;
}

interface IFilterProps<T extends string> {
  items: IFilterItem<T>[];
  selected: T[];
  onChange: (selectedItems: T[]) => void;
}

const Filter = <T extends string>({ items, selected, onChange }: IFilterProps<T>) => {
  const handleClick = (key: T) => {
    if (selected.includes(key)) {
      onChange(selected.filter((value) => value !== key));

      return;
    }

    onChange([...selected, key]);
  }

  return (
    <Container>
      {items.map(({ title, key, image }) => (
        <Item key={key} onClick={() => handleClick(key)}>
          <Image image={image}>
            <Selected isSelected={selected.includes(key)} />
          </Image>
          {title}
        </Item>
      ))}
    </Container>
  );
}

export default Filter;

const Container = styled.div`
  display: flex;
  gap: 50px;
  color: #8f8f8f;
  font-style: italic;
  cursor: pointer;
  text-align: center;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  align-items: center;
`;

const Image = styled.span<{ image: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  margin-bottom: 8px;
  background: url(${({ image }) => image}) center;
  background-size: cover;
  position: relative;
`;

const Selected = styled.span<{ isSelected: boolean }>`
  transition: border 0.15s linear;
  border: ${({ isSelected }) => isSelected ? '5px' : '0'} solid #90caf8;
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
    opacity: ${({ isSelected }) => isSelected ? '1' : '0'};
  }
`;