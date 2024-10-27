import { MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';

import IconButton from 'components/IconButton';
import { HeartIcon } from 'components/Icons';
import { useMediaQuery } from 'hooks';

interface IHeartButtonProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const HeartButton = ({ isActive, className, onClick }: IHeartButtonProps) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const handleIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onClick();
  };

  return (
    <StyledIconButton
      size={isMdDown ? 35 : 40}
      $isActive={isActive}
      onClick={handleIconClick}
      className={className}
    >
      <HeartIcon />
    </StyledIconButton>
  );
};

export default HeartButton;

const StyledIconButton = styled(IconButton)<{ $isActive: boolean }>`
  background: rgba(0, 0, 0, 0.05);
  color: ${({ $isActive }) => ($isActive ? 'red' : 'transparent')};

  svg {
    scale: 1.15;
    stroke: red;
  }
`;
