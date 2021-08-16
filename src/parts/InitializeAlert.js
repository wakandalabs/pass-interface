import {Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function InitializeAlert() {
  return(
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Your browser is outdated!</AlertTitle>
      <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  )
}

export default function WappedInitializeAlert() {
  return(
    <Suspense fallback={null}>
      <InitializeAlert />
    </Suspense>
  )
}