import { MouseEvent } from 'react';
import styled from 'styled-components';

import IconButton from 'components/IconButton';
import { HeartIcon } from 'components/Icons';

interface IHeartButtonProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const HeartButton = ({ isActive, className, onClick }: IHeartButtonProps) => {
  const handleIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onClick();
  };

  return (
    <StyledIconButton size={40} $isActive={false} onClick={handleIconClick} className={className}>
      <HeartIcon />
    </StyledIconButton>
  );
};

export default HeartButton;

const StyledIconButton = styled(IconButton)<{ $isActive: boolean }>`
  background: rgba(0, 0, 0, 0.05);
  color: ${({ $isActive }) => ($isActive ? 'red' : 'transparent')};
  transition: color 0.5s;

  svg {
    scale: 1.15;
    stroke: red;
  }
`;
