import { useToggle } from 'hooks';
import { ChangeEvent, forwardRef, InputHTMLAttributes, useId, useState } from 'react';
import styled from 'styled-components';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, value, placeholder, ...rest }, ref) => {
    const [isFocused, isFocusedHandler] = useToggle(false);
    const id = useId();

    return (
      <InputContainer>
        <StyledInput
          id={id}
          value={value}
          onFocus={isFocusedHandler.on}
          onBlur={isFocusedHandler.off}
          placeholder={placeholder}
          ref={ref}
          {...rest}
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
