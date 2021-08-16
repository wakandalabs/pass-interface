import {Box, Button, Center, Divider, Heading, Spacer, Stack} from "@chakra-ui/react";
import {useInitialized} from "../../hooks/use-initialized";
import {useCurrentUser} from "../../hooks/use-current-user";
import {IDLE, PROCESSING} from "../../global/constants";
import React, {Suspense} from "react";
import StatusItem from "./StatusItem";

export function Initialize() {
  const [cu, loggedIn, {logIn}] = useCurrentUser()
  const init = useInitialized(cu.addr)

  if (!loggedIn) {
    return (
      <Center>
        <Stack pl={4} pr={4} spacing={3} w={650}>
          <Heading>Initialized account</Heading>
          <Heading fontSize={"md"}>Welcome to the world of wakanda!</Heading>
          <Heading fontSize={"md"}>You need initialized your account to use our services.</Heading>
          <Box>
            <Button onClick={logIn}>Log In</Button>
          </Box>
        </Stack>
      </Center>
    )
  }

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={3} w={650}>
        <Heading>Initialize account</Heading>
        <Divider/>
        <StatusItem status={init.status} name={"WakandaToken"} item={init.WakandaToken}/>
        <StatusItem status={init.status} name={"WakandaPass"} item={init.WakandaPass}/>
        <StatusItem status={init.status} name={"WakandaProfile"} item={init.WakandaProfile}/>
        <Divider/>
        <Stack direction={"row"}>
          <Spacer/>
          <Button disabled={init.status !== IDLE || (init.WakandaToken && init.WakandaPass && init.WakandaProfile)}
                  isLoading={init.status === PROCESSING}
                  onClick={init.initialize} w={40} colorScheme={"blue"}>
            {(init.WakandaToken && init.WakandaPass && init.WakandaProfile) ? "Done" : "Initialize"}
          </Button>
        </Stack>
      </Stack>
    </Center>
  )
}

export default function WrappedInitialize() {
  return (
    <Suspense fallback={
      <Center>
        <Stack pl={4} pr={4} spacing={3} w={650}>
          <Heading>Initialize account</Heading>
          <Divider/>
          <StatusItem status={PROCESSING} name={"WakandaToken"} item={false}/>
          <StatusItem status={PROCESSING} name={"WakandaPass"} item={false}/>
          <StatusItem status={PROCESSING} name={"WakandaProfile"} item={false}/>
          <Divider/>
          <Stack direction={"row"}>
            <Spacer/>
            <Button isLoading w={40} loadingText="Checking"/>
          </Stack>
        </Stack>
      </Center>
    }>
      <Initialize/>
    </Suspense>
  )
}