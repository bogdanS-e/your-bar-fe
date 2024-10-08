import { ReactNode, MouseEvent } from 'react';
import styled from 'styled-components';

interface IIconButtonProps {
  children: ReactNode;
  size?: number;
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ children, size, className, disabled, onClick }: IIconButtonProps) => {
  return (
    <Button disabled={disabled} $size={size} className={className} onClick={onClick} type="button">
      {children}
    </Button>
  );
};

export default IconButton;

const Button = styled.button<{ $size?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  width: ${({ $size }) => ($size ? $size + 'px' : 'auto')};
  aspect-ratio: 1 / 1;
  font-family: inherit;
  overflow: hidden;

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.16);
  }

  &:disabled {
    opacity: 0.5;
  }

  svg {
    color: inherit;
    fill: currentColor;
    width: 100%;
    height: 100%;
  }
`;
