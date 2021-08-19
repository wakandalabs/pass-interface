import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";

export function LikedPass({address}) {
  const wakandapass = useWakandaPass(address)
  console.log(wakandapass)

  return (
    <Box>
      Liked Pass
    </Box>
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