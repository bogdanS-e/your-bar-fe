import { ReactNode } from 'react';
import styled from 'styled-components';

interface IIconButtonProps {
  children: ReactNode;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const IconButton = ({
  children,
  size,
  className,
  onClick,
}: IIconButtonProps) => {
  return (
    <Button size={size} className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

export default IconButton;

const Button = styled.button<{ size?: number }>`
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
  width: ${(props) => (props.size ? props.size + 'px' : 'auto')};
  height: ${(props) => (props.size ? props.size + 'px' : 'auto')};

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
