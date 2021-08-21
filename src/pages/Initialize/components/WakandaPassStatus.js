import {Heading, Spacer, Stack} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import {useInitPassHook} from "../../../hooks/use-init-pass.hook";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import React, {Suspense} from "react";
import {StatusItem} from "./StatusItem";

export function WakandaPassStatus() {
  const [cu] = useCurrentUserHook()
  const init = useInitPassHook(cu.addr)

  return (
    <StatusItem name={"WakandaPass"} init={init} />
  )
}

export function WakandaPassStatusSkeleton() {
  return(
    <Stack direction={"row"} align={"center"} h={8}>
      <Heading fontSize={"md"}>WakandaPass</Heading>
      <Spacer/>
        <BeatLoader size={6}/>
    </Stack>
  )
}

export default function WrappedWakandaPassStatus() {
  return(
    <Suspense fallback={<WakandaPassStatusSkeleton/>}>
      <WakandaPassStatus/>
    </Suspense>
  )
}

