import { useCocktails } from 'components/Cocktail';
import Dropdown from 'components/Dropdown';
import IconButton from 'components/IconButton';
import { useIngredients } from 'components/Ingredient';
import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes, useTheme } from 'styled-components';
import { ICocktail } from 'types/cocktail';
import { IIngredient } from 'types/ingredient';
import SearchResult from './SearchResult';
import { SearchIcon } from 'components/Icons';
import Typography from 'styles/Typography';
import { useMediaQuery } from 'hooks';

interface ISearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  hideResults?: boolean;
  hideIcon?: boolean;
}

type TSearchItem = ICocktail | IIngredient;

const SearchBar = ({
  placeholder,
  value,
  onChange,
  autoFocus,
  hideResults,
  hideIcon,
}: ISearchBarProps) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { data: ingredients } = useIngredients();
  const { data: cocktails } = useCocktails();

  const [cocktailIds, setCocktailIds] = useState<string[]>([]);
  const [ingredientIds, setIngredientIds] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hideResults) {
      return;
    }

    const findMatch = ({ nameEn }: TSearchItem) =>
      nameEn.toLowerCase().includes(value.toLowerCase());

    if (value) {
      const cocktailMatches = cocktails?.filter(findMatch);

      if (cocktailMatches) {
        setCocktailIds(cocktailMatches.map(({ _id }) => _id));
      }

      const ingredientMatches = ingredients?.filter(findMatch);

      if (ingredientMatches) {
        setIngredientIds(ingredientMatches.map(({ _id }) => _id));
      }

      return;
    }

    setCocktailIds([]);
    setIngredientIds([]);
  }, [value, cocktails, ingredients, hideResults]);

  const onClose = () => {
    //clear search after closing animation
    setTimeout(() => {
      onChange('');
    }, 500);
  };

  return (
    <StyledDropdown
      onOptionClick={() => onChange('')}
      onClose={onClose}
      items={[
        {
          name: 'Cocktails',
          items: cocktailIds,
        },
        {
          name: 'Ingredients',
          items: ingredientIds,
        },
      ]}
      renderItem={(id) => <SearchResult resultId={id} />}
      trigger={
        <SearchBarWrapper ref={wrapperRef}>
          <SearchInput
            type="text"
            value={value}
            onChange={({ currentTarget }) => onChange(currentTarget.value)}
            autoFocus={autoFocus}
          />
          <PlaceholderWrapper variant="subtitle1" $hasValue={value.length > 0}>
            {placeholder || 'Search cocktails and ingredients'}
          </PlaceholderWrapper>

          {!hideIcon && (
            <SearchIconWrapper>
              <StyledIconButton size={isMdDown ? 35 : 40}>
                <SearchIcon />
              </StyledIconButton>
            </SearchIconWrapper>
          )}
        </SearchBarWrapper>
      }
    />
  );
};

export default SearchBar;

const StyledDropdown: typeof Dropdown = styled(Dropdown)`
  .dropdown-menu {
    width: 350px;
    max-height: min(80vh, 800px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

    &-item {
      padding: 0;
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
      width: 100%;
      left: -30px;
      overscroll-behavior: contain;
    }
  }

  max-width: 500px;
  flex: 1;

  ${({ theme }) => theme.breakpoints.down('md')} {
    max-width: 100%;
  }
`;

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

const animation = () => css`
  ${fadeUp} 0.3s ease-out forwards
`;

const StyledIconButton = styled(IconButton)`
  svg {
    fill: none !important;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const PlaceholderWrapper = styled(Typography)<{ $hasValue: boolean }>`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  color: #aaa;
  pointer-events: none;
  white-space: nowrap;

  ${({ $hasValue }) =>
    $hasValue &&
    `
    transform: translateY(-50%) translateX(20px);
    opacity: 0;
  `}
`;

const SearchInput = styled.input`
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

  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 0.875rem;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;
