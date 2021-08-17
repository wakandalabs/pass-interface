import {Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function TheFooter() {
  return (
    <Stack>

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