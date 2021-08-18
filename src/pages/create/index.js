import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack, Text
} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function Create(){
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Create WakandaPass</Heading>
        </Box>
        <Stack textAlign={"center"} p={12} spacing={12} borderWidth="1px" borderRadius={"lg"} border={"gary"}>
          <Text>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</Text>
          <Box>
            <Button>Choose file</Button>
          </Box>
        </Stack>
        <FormControl id="name">
          <FormLabel fontWeight={"bold"}>Name</FormLabel>
          <Input placeholder="e.g. Wakanda item" size="md" variant={"flushed"}/>
        </FormControl>
        <FormControl id="description">
          <FormLabel fontWeight={"bold"}>Description</FormLabel>
          <Input placeholder="e.g. An amazing thing" size="md" variant={"flushed"}/>
        </FormControl>
        <FormControl id="lockupAmount">
          <FormLabel fontWeight={"bold"}>Lockup amount (Option)</FormLabel>
          <Input placeholder="Amount of WKDT" size="md" variant={"flushed"}/>
          <FormHelperText>Total amount that's subject to lockup schedule</FormHelperText>
        </FormControl>
        <FormControl id="lockupSchedule">
          <FormLabel fontWeight={"bold"}>Lockup schedule (Option)</FormLabel>
          <Input placeholder="" size="md" variant={"flushed"}/>
          <FormHelperText>Defines how much WKDT must remain in the WakandaPass on different dates</FormHelperText>
        </FormControl>
        <Button variant={"outline"} size={"lg"} onClick={() => setShowAdvanced(!showAdvanced)}>
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

export function CreateSkeleton(){
  return (
    <Center minH={"60vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedCreate(){
  return(
    <Suspense fallback={<CreateSkeleton/>}>
      <Create/>
    </Suspense>
  )
}