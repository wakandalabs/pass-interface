import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function CreatedPass({address}) {
  return (
    <Box>
      Created
    </Box>
  )
}

export function CreatePassSkeleton() {
  return (
    <Center h={"40%"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedCreatedPass(props) {
  return (
    <Suspense fallback={<CreatePassSkeleton />}>
      <CreatedPass {...props}/>
    </Suspense>
  )
}