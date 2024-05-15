import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface ModalLayoutProps {
  children: React.ReactNode;
  modalState: boolean;
  hasTitle: boolean;
  modalTitle?: string;
  handleModal: () => void;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  handleModal,
  modalState,
  hasTitle = false,
  modalTitle,
}) => {
  return (
    <Modal isOpen={modalState} onClose={handleModal}>
      <ModalContent position="absolute">
        {hasTitle ? (
          <>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
          </>
        ) : (
          <></>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalLayout;
