import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";

export function CreatedPass({address}) {
  const wakandapass = useWakandaPass(address)
  console.log(wakandapass)

  return (
    <Box>
      Created, {address}
    </Box>
  )
}

export function CreatedPassSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedCreatedPass(props) {
  return (
    <Suspense fallback={<CreatedPassSkeleton/>}>
      <CreatedPass {...props}/>
    </Suspense>
  )
}