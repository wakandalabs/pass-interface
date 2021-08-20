import React, {Suspense} from "react";
import {Heading, SimpleGrid, Stack} from "@chakra-ui/react";
import WakandaPassItem from "./WakandaPassItem";

export function WakandaPassList({items}) {
  return (
    <SimpleGrid minChildWidth="230px" spacing="40px" mt={12}>
      {items.map(pass => (
        <WakandaPassItem pass={pass} key={pass.id}/>
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