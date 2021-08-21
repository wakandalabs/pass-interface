import {Heading, Spacer, Stack} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import React, {Suspense} from "react";
import {useInitProfileHook} from "../../../hooks/use-init-profile.hook";
import {StatusItem} from "./StatusItem";

export function WakandaProfileStatus() {
  const [cu] = useCurrentUserHook()
  const init = useInitProfileHook(cu.addr)

  return (
    <StatusItem name={"WakandaProfile"} init={init} />
  )
}

export function WakandaProfileStatusSkeleton() {
  return(
    <Stack direction={"row"} align={"center"} h={8}>
      <Heading fontSize={"md"}>WakandaProfile</Heading>
      <Spacer/>
      <BeatLoader size={6}/>
    </Stack>
  )
}

export default function WrappedWakandaProfileStatus() {
  return(
    <Suspense fallback={<WakandaProfileStatusSkeleton/>}>
      <WakandaProfileStatus/>
    </Suspense>
  )
}

