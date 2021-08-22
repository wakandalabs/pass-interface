import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useSaleOfferIdsHook} from "../../../hooks/use-sale-offer-ids.hook";
import {useSaleOfferHook} from "../../../hooks/use-sale-offer.hook";

export function SalePass({address}) {
  const saleOffers = useSaleOfferIdsHook(address)
  const saleOffer = useSaleOfferHook(address, saleOffers.saleOfferIds[0])
  console.log(saleOffer.saleOfferItem)

  return (
    <Stack minH={"50vh"}>
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