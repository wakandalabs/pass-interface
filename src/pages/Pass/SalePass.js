import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-wakanpass.hook";

export function SalePass({address}) {
  const wakandapass = useWakandaPass(address)
  console.log(wakandapass)

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
      <SalePass {...props}/>
    </Suspense>
  )
}