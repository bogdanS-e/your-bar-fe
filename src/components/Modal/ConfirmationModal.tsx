import styled from 'styled-components';
import Modal, { IModalProps } from './Modal';
import { Row } from 'styles/components';
import Button from 'components/Button';
import { TButtonVariant } from 'components/Button/Button';

interface IButtonOptions {
  text?: string;
  variant?: TButtonVariant;
  disabled?: boolean;
}

interface IConfirmationModalProps extends IModalProps {
  confirm?: IButtonOptions;
  cancel?: IButtonOptions;
  onConfirm: () => void;
}

const defaultConfirmOptions: IButtonOptions = {
  text: 'Confirm',
};

const defaultCancelOptions: IButtonOptions = {
  text: 'Cancel',
};

const ConfirmationModal = ({
  children,
  confirm = defaultConfirmOptions,
  cancel = defaultCancelOptions,
  onConfirm,
  ...rest
}: IConfirmationModalProps) => {
  return (
    <Modal {...rest}>
      {children}
      <ActionWrapper $gap="20px" $justifyContent="flex-end">
        <Button variant={cancel.variant} disabled={cancel.disabled} onClick={rest.onClose}>
          {cancel.text}
        </Button>
        <Button variant={confirm.variant} disabled={confirm.disabled} onClick={onConfirm}>
          {confirm.text}
        </Button>
      </ActionWrapper>
    </Modal>
  );
};

export default ConfirmationModal;

const ActionWrapper = styled(Row)`
  margin-top: 20px;
`;
