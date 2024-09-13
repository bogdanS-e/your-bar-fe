import { useState, useRef, useEffect, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

type TPosition = 'top' | 'bottom' | 'left';

interface IDropdownProps<T> {
  trigger: ReactNode;
  items: T[];
  position?: TPosition;
  className?: string;
  renderItem?: (item: T) => ReactNode;
  onOptionClick: (item: T) => void;
}

const Dropdown = <T extends number | string>({
  trigger,
  items,
  position = 'bottom',
  className,
  renderItem,
  onOptionClick,
}: IDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onItemClick = (item: T) => {
    onOptionClick(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef} className={className}>
      <DropdownTrigger onClick={() => items.length && setIsOpen(!isOpen)}>
        {trigger}
      </DropdownTrigger>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="dropdown-fade"
        unmountOnExit
      >
        <DropdownMenu className='dropdown-menu' position={position}>
          {items.map((item) => (
            <DropdownItem onClick={() => onItemClick(item)} key={item}>
              {renderItem ? renderItem(item) : item}
            </DropdownItem>
          ))}
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

const DropdownMenu = styled.div<{ position: TPosition }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  min-width: 150px;
  border-radius: 10px;
  overflow-y: auto;

  ${({ position }) =>
    position === 'top' &&
    css`
      bottom: 100%;
      top: unset;
    `}
  ${({ position }) =>
    position === 'left' &&
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
