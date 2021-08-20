import {Box, Button, HStack, Input, NumberInput, NumberInputField, Spacer, Spinner, Text} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import React from "react";
import {useWkdtBalanceHook} from "../../hooks/use-wkdt-balance.hook";
import {fmtWkdt} from "../../util/fmt-wkdt";
import {IDLE} from "../../global/constants";
import {toUFix64} from "../../global/common";

export function TransferTokenSend({address}) {
  const parse = (val) => val.replace(/^\$/, "")
  const [amount, setAmount] = React.useState(0)
  const [to, setTo] = React.useState("")
  const wkdt = useWkdtBalanceHook(address)

  return (
    <Box>
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
      <Text fontSize={"xs"} fontWeight={"bold"}>From</Text>
      <Input placeholder="My address" mb={4} disabled={true} value={address}/>
      <Text fontSize={"xs"} fontWeight={"bold"}>To</Text>
      <HStack mb={8}>
        <Input placeholder="Receiving address"
               value={to} onChange={(event) => setTo(event.target.value)}/>
        <Button
          isLoading={wkdt.status !== IDLE}
          spinner={<BeatLoader size={8} color="white"/>}
          onClick={() => wkdt.transfer(toUFix64(Number(amount)).toString(), to)}
        >Send</Button>
      </HStack>
      <Text fontSize="xs" textColor={"gray.500"}>You may not be able to send transactions to exchanges
        that do not support smart contract transactions. Please confirm that the Flow FT address is correct.</Text>
    </Box>
  )
}

export default function WrappedTransferTokenSend(props) {
  return (
    <TransferTokenSend {...props}/>
  )
}