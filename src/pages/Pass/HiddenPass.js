import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";

export function HiddenPass({address}) {
  const wakandapass = useWakandaPass(address)
  console.log(wakandapass)

  return (
    <Box>
      Hidden
    </Box>
  )
}

export function HiddenPassSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner />
    </Center>
  )
}


export default function WrappedHiddenPass(props) {
  return (
    <Suspense fallback={<HiddenPassSkeleton/>}>
      {/*<HiddenPass {...props}/>*/}
      <HiddenPassSkeleton/>
    </Suspense>
  )
}