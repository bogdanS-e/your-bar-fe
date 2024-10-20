import { MouseEvent } from 'react';
import styled from 'styled-components';

import IconButton from 'components/IconButton';
import { CheckmarkIcon } from 'components/Icons';

interface ICheckmarkButtonProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const CheckmarkButton = ({ isActive, className, onClick }: ICheckmarkButtonProps) => {
  const handleIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onClick();
  };

  return (
    <StyledIconButton
      size={40}
      $isAvailable={isActive}
      onClick={handleIconClick}
      className={className}
    >
      <CheckmarkIcon />
    </StyledIconButton>
  );
};

export default CheckmarkButton;

const StyledIconButton = styled(IconButton)<{ $isAvailable: boolean }>`
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
  color: ${({ $isAvailable }) => ($isAvailable ? '#4CAF50' : '#ccc')};
`;
