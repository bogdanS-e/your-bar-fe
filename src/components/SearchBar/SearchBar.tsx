import IconButton from "components/IconButton";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const matches = ['a', 'abc', 'abcs', 'erwer', 'afad'].filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(matches);

      return;
    }

    setFilteredItems([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
console.log(isFocused && filteredItems.length > 0);

  return (
    <SearchBarWrapper ref={wrapperRef}>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        hasValue={searchTerm.length > 0}
        onFocus={() => setIsFocused(true)}
      />
      <PlaceholderWrapper hasValue={searchTerm.length > 0}>
      Поиск коктейлей и ингридиентов...
      </PlaceholderWrapper>
      <SearchIconWrapper>
        <StyledIconButton size={40}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_152)"> <rect width="24" height="24" fill="white"></rect> <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" stroke-linejoin="round"></circle> <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#000000"></path> </g> <defs> <clipPath id="clip0_15_152"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
        </StyledIconButton>
      </SearchIconWrapper>
      <Dropdown show={isFocused && filteredItems.length > 0}>
        {filteredItems.map((item, index) => (
          <DropdownItem key={index}>
            {item}
          </DropdownItem>
        ))}
      </Dropdown>
    </SearchBarWrapper>
  );
}

export default SearchBar;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animation = () => css`${fadeUp} 0.3s ease-out forwards`;

const StyledIconButton = styled(IconButton)`
  svg {
    fill: none;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 500px;
`;

const PlaceholderWrapper = styled.div<{ hasValue: boolean }>`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: opacity 0.3s ease, transform 0.3s ease;
  color: #aaa;
  pointer-events: none;

  ${({ hasValue }) =>
    hasValue &&
    `
    transform: translateY(-50%) translateX(20px);
    opacity: 0;
  `}
`;

const SearchInput = styled.input<{ hasValue: boolean }>`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 1px solid #ccc;
  transition: border 0.15s linear;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #909022;
  }

`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Dropdown = styled.ul<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
  overflow-y: auto;
  z-index: 1;
  opacity: 0;
  transform: translateY(10px);
  animation: ${({ show }) => show ? animation : 'none'};
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;