import {Heading, Spacer, Stack} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import React, {Suspense} from "react";
import {useInitStorefrontHook} from "../../../hooks/use-init-store.hook";
import {StatusItem} from "./StatusItem";

export function WakandaStorefrontStatus() {
  const [cu] = useCurrentUserHook()
  const init = useInitStorefrontHook(cu.addr)

  return (
    <StatusItem name={"WakandaStorefront"} init={init} />
  )
}

export function WakandaStorefrontStatusSkeleton() {
  return(
    <Stack direction={"row"} align={"center"} h={8}>
      <Heading fontSize={"md"}>WakandaStorefront</Heading>
      <Spacer/>
      <BeatLoader size={6}/>
    </Stack>
  )
}

export default function WrappedWakandaStorefrontStatus() {
  return(
    <Suspense fallback={<WakandaStorefrontStatusSkeleton/>}>
      <WakandaStorefrontStatus/>
    </Suspense>
  )
}

