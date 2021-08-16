import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function About() {
  return (
    <Box>
      About
    </Box>
  )
}

export function AboutSkeleton() {
  return (
    <Center h={"40%"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedAbout() {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <About />
    </Suspense>
  )
}