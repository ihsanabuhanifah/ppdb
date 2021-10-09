import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";

export default function ModalForm({onOpen, onClose, isOpen, children}) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>

         
        </ModalContent>
      </Modal>
    </>
  );
}
