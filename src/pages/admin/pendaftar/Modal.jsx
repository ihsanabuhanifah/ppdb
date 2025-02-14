import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

export default function Imageview({isOpen, onOpen, onClose, image},) {
   
    return (
      <>
        
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Image Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <img


  src={image}
  alt={'image.jpg'}
  className="w-full h-full object-cover"
/>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='green' mr={3} onClick={()=> {
                window.open(image, "_blank")
              }}>
              Download
              </Button>
              <Button colorScheme='red' mr={3} onClick={onClose}>
                Tutup
              </Button>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }