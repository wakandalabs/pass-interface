import {
  Button, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Stack,
  Text, useDisclosure
} from "@chakra-ui/react";
import {PROCESSING} from "../../../../global/constants";
import React, {useState} from "react";

export function TransferPass({pass}){
  const [address ,setAddress] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <Stack>
      <Button size={"sm"} disabled={pass.status === PROCESSING} onClick={onOpen}>Transfer</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer WakandaPass</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"xs"} fontWeight={"bold"}>Enter receiver</Text>
            <Input onChange={(e) => setAddress(e.target.value)}/>
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={"cyan"} isLoading={pass.status === PROCESSING}
                    onClick={() => pass.transfer(address)}
                    >Transfer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default function WrappedTransferPass(props){
  return(
    <TransferPass {...props}/>
  )
}