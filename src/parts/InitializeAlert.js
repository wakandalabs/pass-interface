import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton, Link, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useInitializedHook} from "../hooks/use-initialized.hook";
import {useCurrentUserHook} from "../hooks/use-current-user.hook";

export function InitializeAlert() {
  const [cu, loggedIn] = useCurrentUserHook()
  const init = useInitializedHook(cu.addr)

  if ((!loggedIn) || (loggedIn && init.WakandaToken && init.WakandaPass && init.WakandaProfile)) {
    return <InitializeAlertSkeleton/>
  }

  return (
    <Alert status="error" mb={2}>
      <AlertIcon />
      <AlertTitle mr={2}>Sorry, your account need to be initialized.</AlertTitle>
      <AlertDescription>
        <Link color="teal.500" href={"/initialize"}>
        Let's go!
      </Link></AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  )
}

export function InitializeAlertSkeleton() {
  return (
    <Stack h={4}/>
  )
}

export default function WappedInitializeAlert() {
  return (
    <Suspense fallback={<InitializeAlertSkeleton />}>
      <InitializeAlert />
    </Suspense>
  )
}