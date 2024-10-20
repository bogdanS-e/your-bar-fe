import IconButton from 'components/IconButton';
import { PenIcon } from 'components/Icons';
import styled from 'styled-components';

interface IEditButtonProps {
  onClick: () => void;
  className?: string;
}

const EditButton = ({ onClick }: IEditButtonProps) => {
  return (
    <StyledIconButton size={40} onClick={onClick}>
      <PenIcon />
    </StyledIconButton>
  );
};

export default EditButton;

const StyledIconButton = styled(IconButton)`
  background: rgba(0, 0, 0, 0.05);

  svg {
    stroke: #616161;
  }
`;
