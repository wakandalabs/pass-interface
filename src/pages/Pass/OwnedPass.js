import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function OwnedPass({address}) {
  return (
    <Box>
      Owned
    </Box>
  )
}

export function OwnedPassSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner/>
    </Center>
  )
}

export default function WrappedOwnedPass(props) {
  return (
    <Suspense fallback={<OwnedPassSkeleton/>}>
      {/*<OwnedPass {...props}/>*/}
      <OwnedPassSkeleton/>
    </Suspense>
  )
}