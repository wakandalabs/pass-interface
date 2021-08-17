import {Heading, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function TheFooter() {
  return (
    <Stack p={4} bg={"gray"}>
      <Heading>The footer</Heading>
    </Stack>
  )
}

export function TheFooterSkeleton() {
  return null
}



export default function WrappedTheFooter() {
  return (
    <Suspense fallback={<TheFooterSkeleton/>}>
      <TheFooter/>
    </Suspense>
  )
}