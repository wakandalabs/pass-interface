import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function SalePass({address}) {

  return (
    <Stack>
      {/*<WakandaPassList/>*/}
    </Stack>
  )
}

export function SalePassSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedSalePass(props) {
  return (
    <Suspense fallback={<SalePassSkeleton/>}>
      <SalePass {...props}/>
    </Suspense>
  )
}