import React, {Suspense} from "react";
import {Heading, Stack} from "@chakra-ui/react";

export function WakandaPassList() {
  return(
    <Stack>
      <Heading>Pass</Heading>
    </Stack>
  )
}

export function WakandaPassListSkeleton() {
  return(
    <Stack>
      <Heading>Pass</Heading>
    </Stack>
  )
}

export default function WrappedWakandaPassList() {
  return(
    <Suspense fallback={<WakandaPassListSkeleton />}>
      <WakandaPassList />
    </Suspense>
  )
}