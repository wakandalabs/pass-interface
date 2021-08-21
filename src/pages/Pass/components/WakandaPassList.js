import React, {Suspense} from "react";
import {Heading, SimpleGrid, Stack} from "@chakra-ui/react";
import WakandaPassIdItem from "./WakandaPassItem";

export function WakandaPassList({address ,ids}) {
  return (
    <SimpleGrid minChildWidth="230px" spacing="40px" mt={12}>
      {ids.map(id => (
        <WakandaPassIdItem address={address} id={id} key={id}/>
      ))}
    </SimpleGrid>
  )
}

export function WakandaPassListSkeleton() {
  return (
    <Stack>
      <Heading>Pass</Heading>
    </Stack>
  )
}

export default function WrappedWakandaPassList(props) {
  return (
    <Suspense fallback={<WakandaPassListSkeleton/>}>
      <WakandaPassList {...props}/>
    </Suspense>
  )
}