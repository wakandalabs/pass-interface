import {
  Button,
  HStack, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, NumberInput, NumberInputField,
  Spacer, Spinner, Stack,
  Text, useDisclosure
} from "@chakra-ui/react";
import {IDLE, PROCESSING} from "../../../../global/constants";
import {fmtWkdt} from "../../../../util/fmt-wkdt";
import {parseUFix64} from "../../../../global/common";
import React, {useState} from "react";
import {useWkdtBalanceHook} from "../../../../hooks/use-wkdt-balance.hook";
import {useCurrentUserHook} from "../../../../hooks/use-current-user.hook";

export function TransferWkdtToPass({pass}){
  const parse = (val) => val.replace(/^\$/, "")
  const [cu] = useCurrentUserHook()
  const wkdt = useWkdtBalanceHook(cu.addr)
  const [amount ,setAmount] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <Stack>
      <Button size={"sm"} onClick={onOpen} disabled={pass.status === PROCESSING}>Deposit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer WKDT to WakandaPass</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Text fontSize={"xs"} fontWeight={"bold"}>My balance:</Text>
              <Spacer/>
              {wkdt.status === IDLE ? (
                <Text fontSize={"xs"} fontWeight={"bold"}> {fmtWkdt(wkdt.balance)}</Text>
              ) : (
                <Spinner size="xs"/>
              )}
              <Text fontSize={"xs"} fontWeight={"bold"}>WKDT</Text>
            </HStack>
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
            <Button colorScheme={"cyan"} isLoading={pass.status === PROCESSING}
                    onClick={() => pass.deposit(parseUFix64(Number(amount)).toString())}>Deposit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>

  )
}

export default function WrappedTransferWkdtToPass(props){
  return(
    <TransferWkdtToPass {...props}/>
  )
}