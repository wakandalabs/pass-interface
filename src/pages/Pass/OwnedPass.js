import {Box, Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";
import {WakandaPassList} from "../../parts/WakandaPassList";

export function OwnedPass({address}) {
  const wakandapass = useWakandaPass(address)

  return (
    <Stack>
      {/*<WakandaPassList/>*/}
    </Stack>
  )
}

export function OwnedPassSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner/>
    </Center>
  )
}

export default function WrappedOwnedPass(props) {
  return (
    <Suspense fallback={<OwnedPassSkeleton/>}>
      <OwnedPass {...props}/>
    </Suspense>
  )
}