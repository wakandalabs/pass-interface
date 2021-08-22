import React, {Suspense} from "react";
import {Center, SimpleGrid, Spinner} from "@chakra-ui/react";
import WakandaPassItem from "./WakandaPassItem";

export function WakandaPassList({address ,ids}) {
  return (
    <SimpleGrid minChildWidth="230px" spacing="40px">
      {ids.map(id => (
        <WakandaPassItem address={address} id={id} key={id}/>
      ))}
    </SimpleGrid>
  )
}

export function WakandaPassListSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedWakandaPassList(props) {
  return (
    <Suspense fallback={<WakandaPassListSkeleton/>}>
      <WakandaPassList {...props}/>
    </Suspense>
  )
}