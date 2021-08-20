import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-pass.hook";
import {WakandaPassList} from "../../parts/WakandaPassList";
import {CreatedPassSkeleton} from "./CreatedPass";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";

export function OwnedPass({address}) {
  const [cu, loggedIn] = useCurrentUserHook()
  const wakandapass = useWakandaPass(address)

  if (!loggedIn || wakandapass.pass === null) {
    return (
      <CreatedPassSkeleton />
    )
  }

  return (
    <Stack>
      <WakandaPassList items={wakandapass.pass}/>
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