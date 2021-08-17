import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function SalePass({address}) {
  return (
    <Box>
    Sale, {address}
    </Box>
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
      {/*<SalePass {...props}/>*/}
      <SalePassSkeleton/>
    </Suspense>
  )
}