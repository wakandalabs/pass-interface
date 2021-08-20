import React, {Suspense} from "react";
import {Heading, SimpleGrid, Stack} from "@chakra-ui/react";
import WakandaPassIdItem from "./WakandaPassIdItem";

export function WakandaPassIdsList({address ,ids}) {
  return (
    <SimpleGrid minChildWidth="230px" spacing="40px" mt={12}>
      {ids.map(id => (
        <WakandaPassIdItem address={address} id={id} key={id}/>
      ))}
    </SimpleGrid>
  )
}

export function WakandaPassListIdsSkeleton() {
  return (
    <Stack>
      <Heading>Pass</Heading>
    </Stack>
  )
}

export default function WrappedWakandaPassIdsList(props) {
  return (
    <Suspense fallback={<WakandaPassListIdsSkeleton/>}>
      <WakandaPassIdsList {...props}/>
    </Suspense>
  )
}