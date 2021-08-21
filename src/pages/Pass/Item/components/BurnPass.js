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
import React, {useState} from "react";
import {useWkdtBalanceHook} from "../../../../hooks/use-wkdt-balance.hook";
import {useCurrentUserHook} from "../../../../hooks/use-current-user.hook";

export function BurnPass({pass}){
  const parse = (val) => val.replace(/^\$/, "")
  const [cu] = useCurrentUserHook()
  const wkdt = useWkdtBalanceHook(cu.addr)
  const [amount ,setAmount] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <Stack>
      <Button size={"sm"} disabled={pass.status === PROCESSING} onClick={onOpen}>Burn</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Burn WakandaPass</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"xs"} fontWeight={"bold"}>Burn WakandaPass</Text>
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
            <Button colorScheme={"cyan"} isLoading={pass.status === PROCESSING}>Burn</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default function WrappedBurnPass(props){
  return(
    <BurnPass {...props}/>
  )
}