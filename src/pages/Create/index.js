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
  Stack, Switch,
} from "@chakra-ui/react";
import React, {Suspense, useState} from "react";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {IDLE, PROCESSING} from "../../global/constants";
import {ScheduleEditItem} from "./components/ScheduleEditItem";
import {useWkdtBalanceHook} from "../../hooks/use-wkdt-balance.hook";
import {fmtWkdt} from "../../util/fmt-wkdt";
import {parseUFix64} from "../../global/common";
import {useWakandaPassIds} from "../../hooks/use-pass-ids.hook";
import {CreatedError, CreatingSuccess} from "./components/CreatingSuccess";
import {useIpfs} from "../../hooks/use-ipfs.hook";

export function Create() {
  const [cu] = useCurrentUserHook()
  const wakandapass = useWakandaPassIds(cu.addr)
  const [showLockup, setShowLockup] = React.useState(false)
  const [schedule, setSchedule] = useState([{"key": "", "value": "0.0"}])
  const [lockAmount, setLockAmount] = useState("0.0")
  const [post, setPost] = React.useState({})
  const [receiver, setReceiver] = React.useState(cu.addr)
  const wkdt = useWkdtBalanceHook(cu.addr)
  const parse = (val) => val.replace(/^\$/, "")
  const ipfs = useIpfs()

  function handleSwitch() {
    setSchedule([{"key": "", "value": "0.0"}])
    setShowLockup(!showLockup)
  }

  async function handleUploadFile(e) {
    const file = e.target.files[0]
    const result = await ipfs.uploadFile(file)
    setPost({...post, tokenURI: "https://ipfs.io/ipfs/" + result.path})
  }

  const callback = (items) => {
    setSchedule(items)
    let check = []
    for (const item of schedule) {
      if (item["key"] === "" || isNaN(item["key"])) {
        check.push(false)
      } else {
        check.push(true)
      }
    }
    if (check.find(item => !item) === undefined) {
      const r = [...schedule]
      r.push({"key": "", "value": "0.0"})
      setSchedule(r)
    }
  }

  async function handleMintPass() {
    const metadata = Object.entries(post).map(([key, value]) => ({
      key, value
    }))

    if (showLockup === false || wkdt.balance === 0) {
      await wakandapass.mint(receiver, metadata)
    } else if (showLockup === true && wkdt.balance > 0) {
      let fmtSche = schedule.filter(item => (item["key"] !== "" && item["value"] !== "" && !isNaN(item["key"])))
      await wakandapass.mintWithCustom(receiver, metadata, parseUFix64(Number(lockAmount)), fmtSche)
    }
  }

  if (wakandapass.tx !== null && wakandapass.tx !== undefined && wakandapass.tx.statusCode === 0) {
    return <CreatingSuccess wakandapass={wakandapass}/>
  }

  if (wakandapass.tx === undefined) {
    return <CreatedError wakandapass={wakandapass}/>
  }

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Create WakandaPass</Heading>
        </Box>
        <Stack spacing={12}>
          <FormControl id="media">
            <FormLabel fontWeight={"bold"}>Upload media</FormLabel>
            <Input type="file" multiple size="md" variant={"flushed"} accept="*/*"
                   onChange={handleUploadFile}/>
            <FormHelperText>{post.tokenURI}</FormHelperText>
          </FormControl>
          <FormControl id="title">
            <FormLabel fontWeight={"bold"}>Title</FormLabel>
            <Input placeholder="e.g. Wakanda item" size="md" disabled={wakandapass.status === PROCESSING}
                   variant={"flushed"}
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
              ) : (
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
                           onChange={(valueString) => setLockAmount(parse(valueString))}
                           value={lockAmount} placeholder="Amount of WKDT"
              >
                <NumberInputField/>
              </NumberInput>
              <FormHelperText>Total amount that's subject to lockup schedule. Your balance:
                {wkdt.status === IDLE ? (
                  fmtWkdt(wkdt.balance)
                ) : (
                  <Spinner size={"sm"}/>
                )}
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
          <Button size={"lg"} colorScheme={"cyan"} onClick={handleMintPass}
                  isLoading={wakandapass.status === PROCESSING} loadingText={"Creating"}>Create item</Button>
        </Stack>
        <Stack h={20}/>
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