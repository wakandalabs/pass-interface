import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Stack, Tab,
  TabList, TabPanel, TabPanels,
  Tabs, useDisclosure
} from "@chakra-ui/react";
import {TransferTokenReceive} from "./TransferTokenReceive";
import {TransferTokenSend} from "./TransferTokenSend";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";

export function TransferToken() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [tabIndex, setTabIndex] = React.useState(0)
  const [cu] = useCurrentUserHook()

  function handleTransfer(index) {
    onOpen()
    setTabIndex(index)
  }

  return (
    <Stack direction={"row"}>
      <Button size={"sm"} onClick={() => handleTransfer(0)} fontWeight={"bold"}>Send</Button>
      <Button size={"sm"} onClick={() => handleTransfer(1)} fontWeight={"bold"}>Receive</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Transfer token</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Tabs isFitted variant="soft-rounded" defaultIndex={tabIndex}>
              <TabList mb="1em">
                <Tab>Send</Tab>
                <Tab>Receive</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TransferTokenSend address={cu.addr}/>
                </TabPanel>
                <TabPanel>
                  <TransferTokenReceive address={cu.addr}/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default function WrappedTransferToken(props) {
  return (
    <TransferToken {...props}/>
  )
}