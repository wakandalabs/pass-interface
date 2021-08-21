import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {useWakandaPassIds} from "../../hooks/use-pass-ids.hook";
import {WakandaPassList} from "../../parts/WakandaPassList";


export function OwnedPass({address}) {
  const [cu, loggedIn] = useCurrentUserHook()
  const ids = useWakandaPassIds(address)

  if (!loggedIn) {
    return (
      <OwnedPassSkeleton />
    )
  }

  return (
    <Stack>
      <WakandaPassList ids={ids.ids} address={address}/>
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