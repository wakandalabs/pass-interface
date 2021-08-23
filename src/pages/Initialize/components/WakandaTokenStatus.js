import {Heading, Spacer, Stack} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import React, {Suspense} from "react";
import {useInitWkdtHook} from "../../../hooks/use-init-wkdt.hook";
import {StatusItem} from "./StatusItem";

export function WakandaTokenStatus() {
  const [cu] = useCurrentUserHook()
  const init = useInitWkdtHook(cu.addr)

  return (
    <StatusItem name={"WakandaToken"} init={init} />
  )
}

export function WakandaTokenStatusSkeleton() {
  return(
    <Stack direction={"row"} align={"center"} h={8}>
      <Heading fontSize={"md"}>WakandaToken</Heading>
      <Spacer/>
      <BeatLoader size={6}/>
    </Stack>
  )
}

export default function WrappedWakandaTokenStatus() {
  return(
    <Suspense fallback={<WakandaTokenStatusSkeleton/>}>
      <WakandaTokenStatus/>
    </Suspense>
  )
}

