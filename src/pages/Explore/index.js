import React, {Suspense} from 'react';
import {Box, Center, Spinner} from "@chakra-ui/react";

export function Explore() {
  return (
    <Box pl={4} pr={4}>
      Explore
    </Box>
  );
}

export function ExploreSkeleton() {
  return (
    <Center h={"40vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedExplore() {
  return (
    <Suspense fallback={<ExploreSkeleton />}>
      <Explore/>
    </Suspense>
  )
}