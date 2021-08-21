import {Button, Flex, Stack, Text, useClipboard} from "@chakra-ui/react";
import QRCode from "qrcode.react";
import React from "react";

export function TransferTokenReceive({address}) {
  const {hasCopied, onCopy} = useClipboard(address)

  return (
    <Flex direction="column" align="center">
      <Stack bgColor={"white"} p={2}>
        <QRCode
          value={address}
          size={200}
          fgColor="#000000"
        />
      </Stack>

      <Text m={4} fontWeight={"bold"}>{address}</Text>
      <Button onClick={onCopy} w={32}>
        {hasCopied ? "Copied!" : "Copy"}
      </Button>
    </Flex>
  )
}

export default function WrappedTransferTokenReceive(props) {
  return (
    <TransferTokenReceive {...props}/>
  )
}