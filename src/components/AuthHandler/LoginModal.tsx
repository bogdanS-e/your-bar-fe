import Modal from 'components/Modal';
import AuthHandler from './AuthHandler';
import { Row } from 'styles/components';
import styled from 'styled-components';
import Button from 'components/Button';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: ILoginModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login required">
      <Description>
        In order to proceed this operation you need to be logged in
      </Description>
      <Row $justifyContent="flex-end" $gap="10px">
        <AuthHandler />
        <Button onClick={onClose} variant="error">
          Cancel
        </Button>
      </Row>
    </Modal>
  );
};

export default LoginModal;

const Description = styled.p`
  margin-bottom: 35px;
`;
