import {
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input, InputGroup, InputRightElement, NumberInput, NumberInputField, Spacer,
  Spinner,
  Stack, Switch, Text
} from "@chakra-ui/react";
import React, {Suspense, useState} from "react";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";
import {IDLE, PROCESSING} from "../../global/constants";
import {ScheduleEditItem} from "./ScheduleEditItem";
import {useWkdtBalanceHook} from "../../hooks/use-wkdt-balance.hook";
import {fmtWkdt} from "../../util/fmt-wkdt";

export function Create() {
  const [cu] = useCurrentUserHook()
  const [showLockup, setShowLockup] = React.useState(false)
  const [schedule, setSchedule] = useState([{"key": "", "value": ""}])
  const [lockAmount, setLockAmount] = useState(0)
  const [post, setPost] = React.useState({})
  const [receiver, setReceiver] = React.useState(cu.addr)
  const wakandapass = useWakandaPass(cu.addr)
  const wkdt = useWkdtBalanceHook(cu.addr)

  function handleSwitch() {
    setSchedule([{"key": "", "value": ""}])
    setShowLockup(!showLockup)
  }

  const callback = (items) => {
    setSchedule(items)
    let check = []
    for (const item of schedule) {
      if (item["key"] === "" || item["value"] === "") {
        check.push(false)
      }else{
        check.push(true)
      }
    }
    if (check.find(item => !item) === undefined) {
      const r = [...schedule]
      r.push({"key": "", "value": ""})
      setSchedule(r)
    }
  }

  const metadata = Object.entries(post).map(([key, value]) => ({
    key, value
  }))

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Create WakandaPass</Heading>
        </Box>
        <FormControl id="media">
          <FormLabel fontWeight={"bold"}>Upload media</FormLabel>
          <Stack textAlign={"center"} p={12} spacing={12} borderWidth="1px" borderRadius={"lg"} border={"gary"}>
            <Text color={"gray"}>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</Text>
            <Box>
              <Button>Choose file</Button>
            </Box>
          </Stack>
        </FormControl>
        <FormControl id="title">
          <FormLabel fontWeight={"bold"}>Title</FormLabel>
          <Input placeholder="e.g. Wakanda item" size="md" disabled={wakandapass.status === PROCESSING} variant={"flushed"}
                 onChange={e => setPost({...post, title: e.target.value})}/>
        </FormControl>
        <FormControl id="description">
          <FormLabel fontWeight={"bold"}>Description</FormLabel>
          <Input placeholder="e.g. An amazing thing" size="md" disabled={wakandapass.status === PROCESSING}
                 variant={"flushed"}
                 onChange={e => setPost({...post, description: e.target.value})}/>
        </FormControl>
        <FormControl id="isLockup">
          <Stack direction={"row"} align={"center"}>
            <FormLabel fontWeight={"bold"} bgGradient="linear(to-l, pink.500,cyan)" bgClip="text">Lockup WKDT and set
              schedule</FormLabel>
            <Spacer/>

            {wkdt.balance > 0 ? (
              <Switch id={"lockupSwitch"} value={showLockup} onChange={handleSwitch}/>
            ): (
              <Badge variant="subtle" colorScheme="cyan">Need WKDT</Badge>
            )}
          </Stack>
          <FormHelperText>WakandaPass is capable of hosting WKDT</FormHelperText>
        </FormControl>
        {showLockup && (
          <FormControl id="lockupAmount">
            <FormLabel fontWeight={"bold"}>Lockup amount</FormLabel>
            <NumberInput inputMode="decimal" min={0} allowMouseWheel={true}
                         max={wkdt.balance} disabled={wakandapass.status === PROCESSING}
                         errorBorderColor="red.200" mb={4} variant={"flushed"} size="md"
                         onChange={(valueString) => setLockAmount(Number(valueString))}
                         value={lockAmount} placeholder="Amount of WKDT"
            >
              <NumberInputField/>
            </NumberInput>
            <FormHelperText>Total amount that's subject to lockup schedule. Your balance:
              {wkdt.status !== IDLE ? (
                fmtWkdt(wkdt.balance)
              ) : (
                <Spinner size={"sm"}/>
              ) }
            </FormHelperText>
          </FormControl>
        )}
        {showLockup && (
          <FormControl id="lockupSchedule">
            <FormLabel fontWeight={"bold"}>Lockup schedule</FormLabel>
            <Stack>
              {schedule.map((item, index) => (
                <ScheduleEditItem key={index} index={index} items={schedule} callback={callback}/>
              ))}
            </Stack>
            <FormHelperText>Defines how much WKDT must remain in the WakandaPass on different dates</FormHelperText>
          </FormControl>
        )}
        <FormControl id="receiver">
          <FormLabel fontWeight={"bold"}>Receiver</FormLabel>
          <InputGroup>
            <Input placeholder="Flow account" size="md" variant={"flushed"}
                   disabled={wakandapass.status === PROCESSING}
                   value={receiver} onChange={e => setReceiver(e.target.value)}/>
            <InputRightElement children={<Button size="sm" onClick={() => setReceiver(cu.addr)}>myself</Button>}
                               width={"auto"}/>
          </InputGroup>
          <FormHelperText>You can create WakandaPass for others</FormHelperText>
        </FormControl>
        <Button size={"lg"} colorScheme={"cyan"} onClick={() => wakandapass.mint(receiver, metadata)}
                isLoading={wakandapass.status === PROCESSING} loadingText={"Creating"}>Create item</Button>
      </Stack>
    </Center>
  )
}

export function CreateSkeleton() {
  return (
    <Center minH={"60vh"}>
      <Spinner/>
    </Center>
  )
}

export default function WrappedCreate() {
  return (
    <Suspense fallback={<CreateSkeleton/>}>
      <Create/>
    </Suspense>
  )
}