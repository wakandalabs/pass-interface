import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, NumberInput, NumberInputField, Stack,
  Text, useDisclosure
} from "@chakra-ui/react";
import {PROCESSING} from "../../../../global/constants";
import {parseUFix64} from "../../../../global/common";
import React, {useState} from "react";
import {useWkdtBalanceHook} from "../../../../hooks/use-wkdt-balance.hook";
import {useCurrentUserHook} from "../../../../hooks/use-current-user.hook";

export function SellPass({pass}){
  const parse = (val) => val.replace(/^\$/, "")
  const [cu] = useCurrentUserHook()
  const wkdt = useWkdtBalanceHook(cu.addr)
  const [amount ,setAmount] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <Stack>
      <Button size={"sm"} disabled={pass.status === PROCESSING} onClick={onOpen}>Sell</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell WakandaPass</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"xs"} fontWeight={"bold"}>Enter the price</Text>
            <NumberInput inputMode="decimal" min={0} allowMouseWheel={true}
                         max={wkdt.balance}
                         errorBorderColor="red.200" mb={4}
                         onChange={(valueString) => setAmount(parse(valueString))}
                         value={amount}
            >
              <NumberInputField/>
            </NumberInput>
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={"cyan"} isLoading={pass.status === PROCESSING}>Sell</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default function WrappedSellPass(props){
  return(
    <SellPass {...props}/>
  )
}