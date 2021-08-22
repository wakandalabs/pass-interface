import React, {Suspense} from "react";
import {Center, SimpleGrid, Spinner} from "@chakra-ui/react";
import SalePassItem from "./SalePassItem";
import {useSaleOfferIdsHook} from "../../../hooks/use-sale-offer-ids.hook";

export function SalePassList({address}){
  const saleOffers = useSaleOfferIdsHook(address)
  const ids = saleOffers.saleOfferIds

  return(
    <SimpleGrid minChildWidth="230px" spacing="40px">
      {ids.map(id => (
        <SalePassItem address={address} id={id} key={id}/>
      ))}
    </SimpleGrid>
  )
}

export function SalePassListSkeleton(){
  return(
    <Center h={"50vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedSalePassList(props) {
  return (
    <Suspense fallback={<SalePassListSkeleton />}>
      <SalePassList {...props}/>
    </Suspense>
  )
}