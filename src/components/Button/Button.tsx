import { ReactNode } from 'react';
import styled from 'styled-components';

interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({
  children,
  type,
  onClick,
  disabled,
  className,
}: IButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  padding: 6px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  border: 1px solid #1976d2;
  border-radius: 4px;
  background-color: transparent;
  color: #1976d2;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: rgba(25, 118, 210, 0.04);
    border-color: #1976d2;
  }

  &:disabled {
    color: rgba(25, 118, 210, 0.5);
    border-color: rgba(25, 118, 210, 0.5);
    pointer-events: none;
  }
`;
