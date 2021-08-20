import {Stack, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function LikedPass({address}) {
  return (
    <Stack>
      {/*<WakandaPassList/>*/}
    </Stack>
  )
}

export function LikedPassSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedLikedPass(props) {
  return (
    <Suspense fallback={<LikedPassSkeleton/>}>
      <LikedPass {...props}/>
    </Suspense>
  )
}