import { useToggle } from 'hooks';
import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useId, useState } from 'react';
import styled from 'styled-components';
import Typography from 'styles/Typography';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  variant?: 'standard' | 'outlined';
  renderEnd?: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, value, placeholder, renderEnd, variant = 'standard', ...inputProps }, ref) => {
    const [isFocused, isFocusedHandler] = useToggle(false);
    const id = useId();

    if (variant === 'outlined') {
      return (
        <OutlinedInputContainer>
          <Input3 id={id} ref={ref} value={value} placeholder="" {...inputProps} />
          {placeholder && (
            <Placeholder variant="subtitle1" $hasValue={value.toString().length > 0}>
              {placeholder}
            </Placeholder>
          )}

          {renderEnd && <IconWrapper>{renderEnd}</IconWrapper>}
        </OutlinedInputContainer>
      );
    }

    return (
      <InputContainer>
        <StyledInput
          id={id}
          ref={ref}
          value={value}
          onFocus={isFocusedHandler.on}
          onBlur={isFocusedHandler.off}
          placeholder={placeholder}
          {...inputProps}
        />
        <StyledLabel
          htmlFor={id}
          $isActive={!!placeholder || isFocused || !!value || typeof value === 'number'}
        >
          {label}
        </StyledLabel>
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const OutlinedInputContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Placeholder = styled(Typography)<{ $hasValue: boolean }>`
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

const Input3 = styled.input`
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

const InputContainer = styled.div`
  position: relative;
`;

const StyledLabel = styled.label<{ $isActive: boolean }>`
  position: absolute;
  top: ${({ $isActive }) => ($isActive ? '0' : '50%')};
  left: ${({ $isActive }) => ($isActive ? '0' : '10px')};
  color: #aaa;
  font-size: ${({ $isActive }) => ($isActive ? '0.75rem' : '1rem')};
  transition: all 0.2s ease-in-out;
  pointer-events: none;
  transform: translateY(-50%);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 0 3px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;
  color: inherit;

  &:focus {
    border-bottom-color: #3f51b5;
  }

  &:focus + ${StyledLabel} {
    color: #3f51b5;
  }
`;
