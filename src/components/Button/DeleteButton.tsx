import styled from 'styled-components';

import IconButton from 'components/IconButton';
import { TrashIcon } from 'components/Icons';

interface IDeleteButtonProps {
  onClick: () => void;
  className?: string;
}

const DeleteButton = ({ className, onClick }: IDeleteButtonProps) => {
  return (
    <StyledIconButton size={40} onClick={onClick} className={className}>
      <TrashIcon />
    </StyledIconButton>
  );
};

export default DeleteButton;

const StyledIconButton = styled(IconButton)`
  background: rgba(0, 0, 0, 0.05);
  color: transparent;

  svg path {
    stroke: red;
  }
`;
