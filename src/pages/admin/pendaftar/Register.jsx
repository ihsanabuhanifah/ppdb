import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import RegisterModal from "../../auth/registerModal";

export default function ModalRegister({ isOpen, onOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="60%">
          
          <ModalCloseButton />
          <ModalBody>
            <RegisterModal onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
