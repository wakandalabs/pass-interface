import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";
import WakandaPassList from "../../parts/WakandaPassList";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";

export function CreatedPass({address}) {
  const [cu, loggedIn] = useCurrentUserHook()
  const wakandapass = useWakandaPass(address)

  const result = wakandapass.pass.filter(pass => pass.originalOwner === cu.addr )

  if (!loggedIn || wakandapass.pass === null) {
    return (
      <CreatedPassSkeleton />
    )
  }

  return (
    <Stack>
      <WakandaPassList items={result}/>
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