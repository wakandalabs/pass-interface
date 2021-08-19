import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";
import {WakandaPassList} from "../../parts/WakandaPassList";

export function SalePass({address}) {
  const wakandapass = useWakandaPass(address)

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