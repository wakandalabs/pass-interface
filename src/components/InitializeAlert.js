import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton, Stack, Text} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useCurrentUserHook} from "../hooks/use-current-user.hook";
import {useInitWkdtHook} from "../hooks/use-init-wkdt.hook";
import {useInitProfileHook} from "../hooks/use-init-profile.hook";
import {useInitPassHook} from "../hooks/use-init-pass.hook";
import {useInitStorefrontHook} from "../hooks/use-init-store.hook";
import {useHistory} from "react-router-dom";

export function InitializeAlert() {
  const [cu, loggedIn] = useCurrentUserHook()
  const wkdt = useInitWkdtHook(cu.addr)
  const profile = useInitProfileHook(cu.addr)
  const pass = useInitPassHook(cu.addr)
  const storefront = useInitStorefrontHook(cu.addr)
  const history = useHistory()

  if ((!loggedIn) || (loggedIn && wkdt.isInitialized && profile.isInitialized && pass.isInitialized && storefront.isInitialized)) {
    return <InitializeAlertSkeleton/>
  }

  return (
    <Alert status="error" mb={2}>
      <AlertIcon />
      <AlertTitle mr={2}>Sorry, your account need to be initialized.</AlertTitle>
      <AlertDescription>
        <Text color="teal.500" onClick={()=> history.push("/initialize")}>
        Let's go!
      </Text>
      </AlertDescription>
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