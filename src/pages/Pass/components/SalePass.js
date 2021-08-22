import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import SalePassList from "./SalePassList";

export function SalePass({address}) {
  return (
    <Stack minH={"50vh"} mt={6}>
      <SalePassList address={address}/>
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