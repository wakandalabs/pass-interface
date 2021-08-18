import {Box, Button, Center, Heading, Stack} from "@chakra-ui/react";
import {useInitialized} from "../../hooks/use-initialized";
import {useCurrentUser} from "../../hooks/use-current-user";
import {IDLE, PROCESSING} from "../../global/constants";
import React, {Suspense} from "react";
import StatusItem from "./StatusItem";

export function Initialize() {
  const [cu, loggedIn] = useCurrentUser()
  const init = useInitialized(cu.addr)

  if (!loggedIn) {
    return (
      <InitializeSkeleton/>
    )
  }

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Initialize account</Heading>
        </Box>
        <StatusItem status={init.status} name={"WakandaToken"} item={init.WakandaToken}/>
        <StatusItem status={init.status} name={"WakandaPass"} item={init.WakandaPass}/>
        <StatusItem status={init.status} name={"WakandaProfile"} item={init.WakandaProfile}/>
        <Button disabled={init.status !== IDLE || (init.WakandaToken && init.WakandaPass && init.WakandaProfile)}
                isLoading={init.status === PROCESSING} fontWeight={"bold"} size={"lg"}
                onClick={init.initialize} colorScheme={"cyan"}>
          {(init.WakandaToken && init.WakandaPass && init.WakandaProfile) ? "Done" : "Initialize"}
        </Button>
      </Stack>
    </Center>
  )
}

export function InitializeSkeleton() {
  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Initialize account</Heading>
        </Box>
        <StatusItem status={PROCESSING} name={"WakandaToken"} item={false}/>
        <StatusItem status={PROCESSING} name={"WakandaPass"} item={false}/>
        <StatusItem status={PROCESSING} name={"WakandaProfile"} item={false}/>
        <Button isLoading loadingText="Checking" size={"lg"} colorScheme={"cyan"}/>
      </Stack>
    </Center>
  )
}

export default function WrappedInitialize() {
  return (
    <Suspense fallback={<InitializeSkeleton/>}>
      <Initialize/>
    </Suspense>
  )
}