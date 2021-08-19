import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";
import WakandaPassList from "../../parts/WakandaPassList";

export function CreatedPass({address}) {
  const wakandapass = useWakandaPass(address)
  return (
    <Stack>
      <WakandaPassList items={wakandapass.pass}/>
    </Stack>
  )
}

export function CreatedPassSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedCreatedPass(props) {
  return (
    <Suspense fallback={<CreatedPassSkeleton/>}>
      <CreatedPass {...props}/>
    </Suspense>
  )
}