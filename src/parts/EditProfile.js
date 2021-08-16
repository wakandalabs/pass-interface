import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import React from "react";

export function EditProfile({isOpen, onClose}){
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default function WrappedEditProfile(props) {
  return (
    <EditProfile {...props}/>
  )
}