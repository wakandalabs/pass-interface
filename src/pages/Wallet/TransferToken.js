import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Tab,
  TabList, TabPanel, TabPanels,
  Tabs, useDisclosure
} from "@chakra-ui/react";
import {TransferTokenReceive} from "./TransferTokenReceive";
import {TransferTokenSend} from "./TransferTokenSend";


export function TransferToken({address}) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [tabIndex, setTabIndex] = React.useState(0)

  function handleTransfer(index) {
    onOpen()
    setTabIndex(index)
  }

  return (
    <>
      <Button size={"sm"} onClick={() => handleTransfer(0)}>Send</Button>
      <Button size={"sm"} onClick={() => handleTransfer(1)}>Receive</Button>
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
                  <TransferTokenSend address={address}/>
                </TabPanel>
                <TabPanel>
                  <TransferTokenReceive address={address}/>
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