import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function HiddenPass({address}) {
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