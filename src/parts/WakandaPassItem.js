import React, {Suspense} from "react";
import {Heading, Stack} from "@chakra-ui/react";

export function WakandaPassItem({pass}) {
  console.log(pass.owner)
  return(
    <Stack>
      {/*<Heading>{pass}</Heading>*/}
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

export default function WrappedWakandaPassItem(props) {
  return(
    <Suspense fallback={<WakandaPassItemSkeleton />}>
      <WakandaPassItem {...props}/>
    </Suspense>
  )
}