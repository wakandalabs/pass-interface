import {Box, Center, Heading, Spinner, Stack} from "@chakra-ui/react";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import React from "react";
import WakandaPassStatus from "./components/WakandaPassStatus";
import WakandaTokenStatus from "./components/WakandaTokenStatus";
import WakandaProfileStatus from "./components/WakandaProfileStatus";

export function Initialize() {
  const [cu, loggedIn] = useCurrentUserHook()

  if (!loggedIn) {
    return (
      <Center>
        <Spinner/>
      </Center>
    )
  }

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Initialize account</Heading>
        </Box>
        <WakandaTokenStatus />
        <WakandaPassStatus />
        <WakandaProfileStatus />
      </Stack>
    </Center>
  )
}

export default function WrappedInitialize() {
  return (
    <Initialize/>
  )
}