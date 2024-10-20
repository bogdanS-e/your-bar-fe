import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export type TButtonVariant = 'regular' | 'error';
interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: TButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({
  children,
  type,
  onClick,
  disabled,
  className,
  variant = 'regular',
}: IButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
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

const StyledButton = styled.button<{ $variant: TButtonVariant }>`
  padding: 6px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  border-radius: 4px;
  background-color: transparent;
  color: #1976d2;
  border: 1px solid currentColor;

  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: rgba(25, 118, 210, 0.04);
  }

  &:disabled {
    color: rgba(25, 118, 210, 0.5);
    border-color: rgba(25, 118, 210, 0.5);
    pointer-events: none;
  }

  ${({ $variant }) =>
    $variant === 'error' &&
    css`
      color: #f44336;

      &:hover {
        background-color: rgba(244, 67, 54, 0.08);
      }
    `}
`;
