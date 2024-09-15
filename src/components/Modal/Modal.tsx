import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  keepUnmount?: boolean; //ignore useEffect on isOpen=false
  className?: string;
}
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  keepUnmount,
  className,
}: IModalProps) => {
  useEffect(() => {
    if (!isOpen && keepUnmount) {
      return;
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      return;
    }

    document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, keepUnmount]);

  if (typeof window === 'undefined' || !isOpen) return null;

  return createPortal(
    <ModalOverlay onMouseDown={onClose}>
      <ModalContent
        className={className}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>,
    window.document.getElementById('modal-root')!
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 500px;
  max-width: 90%;
  max-height: 90dvh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding-top: 10px;
`;
