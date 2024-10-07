import { useState, useRef, useEffect, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useToggle } from 'hooks';

type TPosition = 'top' | 'bottom' | 'left';
type TKey = number | string;

interface IGroup<T> {
  name: string;
  items: T[];
}

interface IDropdownProps<T> {
  trigger: ReactNode;
  items: T[] | IGroup<T>[];
  position?: TPosition;
  className?: string;
  renderItem?: (item: T) => ReactNode;
  onOptionClick: (item: T) => void;
}

const Dropdown = <T extends TKey>({
  trigger,
  items,
  position = 'bottom',
  className,
  renderItem,
  onOptionClick,
}: IDropdownProps<T>) => {
  const [isOpen, isOpenHandler] = useToggle(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onItemClick = (item: T) => {
    onOptionClick(item);
    isOpenHandler.off();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        isOpenHandler.off();
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  const renderItems = () => {
    const renderOptions = (items: T[]) => {
      return items.map((item) => (
        <DropdownItem className="dropdown-menu-item" onClick={() => onItemClick(item)} key={item}>
          {renderItem ? renderItem(item) : item}
        </DropdownItem>
      ));
    };

    if (typeof items[0] === 'object') {
      const groups = items as IGroup<T>[];

      return groups.map(
        ({ name, items }) =>
          !!items.length && (
            <div key={name}>
              <GroupTitle className="group-title">{name}</GroupTitle>
              {renderOptions(items)}
            </div>
          )
      );
    }

    return renderOptions(items as T[]);
  };

  const isMenuShown = () => {
    if (typeof items[0] !== 'object') {
      return !!items.length;
    }

    const groups = items as IGroup<T>[];

    for (const { items } of groups) {
      if (items.length) {
        return true;
      }
    }

    return false;
  };

  return (
    <DropdownContainer ref={dropdownRef} className={className}>
      <DropdownTrigger onClick={isOpenHandler.on}>{trigger}</DropdownTrigger>
      <CSSTransition in={isOpen} timeout={300} classNames="dropdown-fade" unmountOnExit>
        <DropdownMenu className="dropdown-menu" $position={position} $isShown={isMenuShown()}>
          {renderItems()}
        </DropdownMenu>
      </CSSTransition>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownTrigger = styled.div`
  cursor: pointer;
`;

const DropdownMenu = styled.div<{ $position: TPosition; $isShown: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: ${({ $isShown }) => ($isShown ? '1px solid #ccc' : 'none')};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  min-width: 150px;
  border-radius: 10px;
  overflow-y: auto;

  ${({ $position }) =>
    $position === 'top' &&
    css`
      bottom: 100%;
      top: unset;
    `}
  ${({ $position }) =>
    $position === 'left' &&
    css`
      right: 0;
      left: unset;
    `}
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:first-child {
    border-radius: 10px 10px 0 0;
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const GroupTitle = styled(DropdownItem)`
  color: #8f8f8f;
  pointer-events: none;
`;
