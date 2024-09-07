import { ChangeEvent, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const Textarea = (props: ITextareaProps) => {
  return (
    <StyledTextarea {...props} />
  );
};

export default Textarea;

const StyledTextarea = styled.textarea`
  resize: none;
  display: block;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #ccc;
  outline: none;
  padding: 5px 10px;
  font-family: inherit;
  color: inherit;
  font-size: 1rem;

  &:focus {
    border-color: #3f51b5;
  }
`;

