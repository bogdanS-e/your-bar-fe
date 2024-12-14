import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import { useMemo, MouseEvent } from 'react';
import styled from 'styled-components';

export interface IMultiselectItem<T> {
  key: T;
  title: string;
}

interface IMultiselectProps<T> {
  selectedOptions: T[];
  options: IMultiselectItem<T>[];
  onChange: (selectedItems: T[]) => void;
}

const Multiselect = <T extends string | number>({
  options,
  selectedOptions,
  onChange,
}: IMultiselectProps<T>) => {
  const optionsMap = useMemo(() => {
    const map = new Map<T, IMultiselectItem<T>>();

    for (const option of options) {
      map.set(option.key, option);
    }

    return map;
  }, [options]);

  const inputValue = useMemo(() => {
    if (selectedOptions.length === options.length) {
      return 'All items selected';
    }

    if (selectedOptions.length > 4) {
      return `${selectedOptions.length} items selected`;
    }

    const titles: string[] = [];

    for (const selected of selectedOptions) {
      titles.push(optionsMap.get(selected)?.title || '');
    }

    return titles.join(', ');
  }, [selectedOptions, optionsMap]);

  const onItemClick = (item: T) => (isChecked: boolean) => {
    if (isChecked) {
      onChange([...selectedOptions, item]);

      return;
    }

    onChange(selectedOptions.filter((prevItem) => prevItem !== item));
  };

  const onClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <StyledDropdown
      closeOnItemClick={false}
      trigger={
        <Input
          variant="outlined"
          readOnly
          label="Choose ingredient"
          value={inputValue}
          onChange={() => {}}
          placeholder="Select ingredients"
          renderEnd={<CloseButton onClick={onClear}>&times;</CloseButton>}
        />
      }
      renderItem={(item) => (
        <Checkbox
          label={optionsMap.get(item)?.title || ''}
          isChecked={selectedOptions.includes(item)}
          onChange={onItemClick(item)}
        />
      )}
      items={options.map(({ key }) => key)}
      onOptionClick={() => {}}
    />
  );
};

export default Multiselect;

const CloseButton = styled(IconButton)`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const StyledDropdown: typeof Dropdown = styled(Dropdown)`
  width: 100%;
  flex: 1;
`;
