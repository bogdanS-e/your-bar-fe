import React from 'react';
import styled from 'styled-components';
import { Row } from 'styles/components';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={isChecked} onChange={handleCheckboxChange} />
      <StyledCheckbox
        isChecked={isChecked}
        alignItems="center"
        justifyContent="center"
      />
      <LabelText>{label}</LabelText>
    </CheckboxContainer>
  );
};

export default Checkbox;

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  margin: 0;
  padding: 0;
  height: 0;
  width: 0;
  visibility: hidden;
`;

const StyledCheckbox = styled(Row)<{ isChecked: boolean }>`
  width: 20px;
  height: 20px;
  background: ${({ isChecked }) => (isChecked ? '#3f51b5' : '#fff')};
  border: 2px solid ${({ isChecked }) => (isChecked ? '#3f51b5' : '#ccc')};
  border-radius: 4px;
  transition: all 150ms;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #3f51b5;
  }

  &::before {
    content: '${({ isChecked }) => (isChecked ? '✓' : '')}';
    color: #fff;
    font-size: 1rem;
    position: absolute;
  }
`;

const LabelText = styled.span`
  margin-left: 8px;
  font-size: 1rem;
  color: inherit;
`;
