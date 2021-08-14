import React from "react";
import {
  Box, Button, Flex, HStack, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, NumberInput, NumberInputField, Spacer, Spinner, Tab,
  TabList, TabPanel, TabPanels,
  Tabs, Text, useClipboard, useDisclosure
} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import QRCode from "qrcode.react";


export function TransferToken({address}) {
  // const parse = (val) => val.replace(/^\$/, "")
  // const [amount, setAmount] = React.useState(0)
  const [to, setTo] = React.useState("")
  const {hasCopied, onCopy} = useClipboard(address)
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <Button size={"sm"} onClick={onOpen}>Send</Button>
      <Button size={"sm"} onClick={onOpen}>Receive</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Transfer token</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Tabs isFitted variant="soft-rounded">
              <TabList mb="1em">
                <Tab>Send</Tab>
                <Tab>Receive</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>
                    <HStack>
                      <Text fontSize={"xs"} fontWeight={"bold"}>My balance:</Text>
                      <Spacer/>
                      {/*{vibranium.status === IDLE ? (*/}
                      {/*  <Text fontSize={"xs"} fontWeight={"bold"}> {fmtVibranium(vibranium.balance)}</Text>*/}
                      {/*) : (*/}
                        <Spinner size="xs"/>
                      {/*)}*/}
                      <Text fontSize={"xs"} fontWeight={"bold"}>WKDT</Text>
                    </HStack>
                    <NumberInput inputMode="decimal" min={0} allowMouseWheel={true}
                      // max={wkdt.balance}
                                 errorBorderColor="red.200" mb={4}
                      // onChange={(valueString) => setAmount(parse(valueString))}
                      // value={amount}
                    >
                      <NumberInputField/>
                    </NumberInput>
                    <Text fontSize={"xs"} fontWeight={"bold"}>From</Text>
                    <Input placeholder="My address" mb={4} disabled={true} value={address}/>
                    <Text fontSize={"xs"} fontWeight={"bold"}>To</Text>
                    <HStack mb={8}>
                      <Input placeholder="Receiving address"
                             value={to} onChange={(event) => setTo(event.target.value)}/>
                      <Button
                        // isLoading={vibranium.status !== IDLE}
                        spinner={<BeatLoader size={8} color="white"/>}
                        // onClick={() => vibranium.transfer(Number(amount), to)}
                      >Send</Button>
                    </HStack>
                    <Text fontSize="xs" textColor={"gray.500"}>You may not be able to send transactions to exchanges
                      that do
                      not support smart
                      contract
                      transactions. Please confirm that the Flow FT address is correct.</Text>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Flex direction="column" align="center">
                    <QRCode
                      value={address}
                      size={200}
                      fgColor="#000000"
                    />
                    <Text m={4} fontWeight={"bold"}>{address}</Text>
                    <Button onClick={onCopy} w={32}>
                      {hasCopied ? "Copied!" : "Copy"}
                    </Button>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function WrappedTransferToken(props) {
  return (
    <TransferToken {...props}/>
  )
}