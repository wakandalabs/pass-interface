import React, {Suspense} from 'react';
import {Box, Center, Spinner} from "@chakra-ui/react";
import {TheFooter} from "../../components/TheFooter";

export function Explore() {
  return (
    <Box pl={4} pr={4} minH={"60vh"}>
      Explore
    </Box>
  );
}

export function ExploreSkeleton() {
  return (
    <Center minH={"60vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedExplore() {
  return (
    <Suspense fallback={<ExploreSkeleton />}>
      <Explore/>
      <TheFooter/>
    </Suspense>
  )
}