import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
export default function AlertLogout({
  title,
  message,
  isOpen,
  onClose,
  isLoading,
  onConfirm,
  closeOnOverlayClick = false,
  closeOnEsc = false,
}) {
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
    >
      <AlertDialogOverlay />
      <AlertDialogContent rounded="md">
        <AlertDialogHeader fontSize="md" color="gray.800" fontWeight="bold">
          {title}
        </AlertDialogHeader>

        <AlertDialogBody color="gray.800">
            <p className="font-bold text-gray-700">{message}</p>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button
            fontSize="sm"
            color="gray.800"
            // fontWeight="normal"
            disabled={isLoading}
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            // fontWeight="normal"
            colorScheme="red"
            onClick={onConfirm}
            ml={3}
            fontSize="sm"
            isLoading={isLoading}
          >
            Konfirmasi
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

AlertLogout.propTypes = {
  closeOnEsc: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  message: PropTypes.any,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
};

