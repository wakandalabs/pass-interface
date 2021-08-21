import React, {Suspense, useState} from "react";
import {
  Button, HStack,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader,
  ModalOverlay, NumberInput, NumberInputField,
  Spacer, Spinner,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import {fmtWkdt} from "../../../../util/fmt-wkdt";
import {IDLE} from "../../../../global/constants";
import {useWkdtBalanceHook} from "../../../../hooks/use-wkdt-balance.hook";
import {useCurrentUserHook} from "../../../../hooks/use-current-user.hook";
import {parseUFix64} from "../../../../global/common";

export function Detail({pass}) {
  const parse = (val) => val.replace(/^\$/, "")
  const [cu] = useCurrentUserHook()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const wkdt = useWkdtBalanceHook(cu.addr)
  const [amount ,setAmount] = useState(0)

  return (
    <Stack mt={4}>
      <Text fontWeight={"bold"} fontSize={"sm"}>Owner: {pass.pass.owner}</Text>
      <Text fontWeight={"bold"} fontSize={"sm"}>Idle balance: {fmtWkdt(pass.pass.idleBalance, true)}</Text>
      <Stack direction={"row"}>
        <Button size={"sm"} onClick={onOpen}>Deposit</Button>
        <Button size={"sm"} onClick={pass.withdraw}
                       disabled={Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Withdraw</Button>
        <Button size={"sm"}
                disabled={Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Stake</Button>
      </Stack>
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
            <Button colorScheme={"cyan"} onClick={() => pass.deposit(parseUFix64(amount).toString())}>Deposit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export function DetailSkeleton() {
  return (
    <></>
  )
}

export default function WrappedDetailSkeleton(props) {
  return (
    <Suspense fallback={<DetailSkeleton/>}>
      <Detail {...props}/>
    </Suspense>
  )
}