import {
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input, Spacer,
  Spinner,
  Stack, Text
} from "@chakra-ui/react";
import React, {Suspense} from "react";
import ScheduleEditList from "./ScheduleEditList";

export function Create() {
  const [showAdvanced, setShowAdvanced] = React.useState(false)
  const [showLockup, setShowLockup] = React.useState(false)
  const [post, setPost] = React.useState({})

  console.log(post)

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
          <Input placeholder="e.g. Wakanda item" size="md" variant={"flushed"}
                 onChange={e => setPost({ ...post, title: e.target.value })}/>
        </FormControl>
        <FormControl id="description">
          <FormLabel fontWeight={"bold"}>Description</FormLabel>
          <Input placeholder="e.g. An amazing thing" size="md" variant={"flushed"}
                 onChange={e => setPost({ ...post, description: e.target.value })}/>
        </FormControl>
        <FormControl id="isLockup">
          <Stack direction={"row"} align={"center"}>
            <FormLabel fontWeight={"bold"} bgGradient="linear(to-l, pink.500,cyan)" bgClip="text">Lockup WKDT and set schedule</FormLabel>
            <Spacer/>
            <Badge variant="subtle" colorScheme="cyan">Coming soon</Badge>
            {/*<Switch id={"lockupSwitch"} value={showLockup} onChange={() => setShowLockup(!showLockup)}/>*/}
          </Stack>
          <FormHelperText>WakandaPass is capable of hosting WKDT</FormHelperText>
        </FormControl>
        {showLockup && (
          <FormControl id="lockupAmount">
            <FormLabel fontWeight={"bold"}>Lockup amount</FormLabel>
            <Input placeholder="Amount of WKDT" size="md" variant={"flushed"}/>
            <FormHelperText>Total amount that's subject to lockup schedule</FormHelperText>
          </FormControl>
        )}
        {showLockup && (
          <FormControl id="lockupSchedule">
            <FormLabel fontWeight={"bold"}>Lockup schedule</FormLabel>
            <ScheduleEditList />
            <FormHelperText>Defines how much WKDT must remain in the WakandaPass on different dates</FormHelperText>
          </FormControl>
        )}
        <Button variant={"outline"} size={"lg"} onClick={() => setShowAdvanced(!showAdvanced)} disabled>
          {showAdvanced ? "Hide" : "Show"} advanced settings
        </Button>
        {showAdvanced && (
          <FormControl id="properties">
            <FormLabel fontWeight={"bold"}>Properties (Option)</FormLabel>
            <Stack direction={"row"}>
              <Input placeholder="e.g. Size" size="md" variant={"flushed"}/>
              <Input placeholder="e.g. M" size="md" variant={"flushed"}/>
            </Stack>
          </FormControl>
        )}
        {showAdvanced && (
          <FormControl id="alternativeText">
            <FormLabel fontWeight={"bold"}>Alternative text for NFT (Option)</FormLabel>
            <Input placeholder="e.g. An amazing thing" size="md" variant={"flushed"}/>
            <FormHelperText>Text that will be used in VoiceOver for people with disabilities</FormHelperText>
          </FormControl>
        )}
        <Button size={"lg"} colorScheme={"cyan"}>Create item</Button>
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