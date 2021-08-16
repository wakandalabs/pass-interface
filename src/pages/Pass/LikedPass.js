import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function LikedPass({address}) {
  return (
    <Box>
      Liked Pass
    </Box>
  )
}

export function LikedPassSkeleton() {
  return (
    <Center h={"40%"}>
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