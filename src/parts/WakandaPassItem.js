import React, {Suspense} from "react";
import {Heading, Stack} from "@chakra-ui/react";

export function WakandaPassItem() {
  return(
    <Stack>
      <Heading>Pass</Heading>
    </Stack>
  )
}

export function WakandaPassItemSkeleton() {
  return(
    <Stack>
      <Heading>Pass</Heading>
    </Stack>
  )
}

export default function WrappedWakandaPassItem() {
  return(
    <Suspense fallback={<WakandaPassItemSkeleton />}>
      <WakandaPassItem />
    </Suspense>
  )
}