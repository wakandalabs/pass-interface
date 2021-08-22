import React, {Suspense} from "react";
import {useProfileHook} from "../../../hooks/use-profile.hook";
import {useHistory} from "react-router-dom";
import {
  Avatar,
  AvatarGroup, Button,
  IconButton,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import {FiMoreHorizontal} from "react-icons/all";
import {fmtWkdt} from "../../../util/fmt-wkdt";
import {useSaleOfferHook} from "../../../hooks/use-sale-offer.hook";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import {PROCESSING} from "../../../global/constants";

export function SalePassItem({address, id}){
  const saleOffer = useSaleOfferHook(address, id)
  const pass = saleOffer.saleOfferItem.item
  const originOwner = useProfileHook(pass.originalOwner)
  const owner = useProfileHook(pass.owner)
  const history = useHistory()
  const [cu] =useCurrentUserHook()
  const price = saleOffer.saleOfferItem.price

  return(
    <Stack spacing={3} border="1px" boxShadow="xs" borderColor="gray.100" rounded="md" height="400px" maxW={"250px"}
           p={4}
           direction={"column"}>
      <Stack direction={"row"} align={"center"}>
        <AvatarGroup size="sm" max={2}>
          <Avatar name={originOwner.profile.name} src={originOwner.profile.avatar} colorScheme={"cyan"}/>
          <Avatar name={owner.profile.name} src={originOwner.profile.avatar}/>
        </AvatarGroup>
        <Spacer/>
        <IconButton aria-label={"more"} icon={<FiMoreHorizontal />} variant={"ghost"} size={"sm"}/>
      </Stack>
      {/*<AspectRatio>*/}
      {/*  <Image src="" alt="naruto" objectFit="cover" />*/}
      {/*</AspectRatio>*/}
      <Spacer/>
      <Stack spacing={0}>
        <Text fontSize={"md"} fontWeight={"bold"} onClick={() => history.push("/" + address + "/" + String(pass.id))}>{pass.metadata.title} #{pass.id}</Text>
        {price !== null && (
          <Stack direction={"row"} align={"center"}>

            <Text fontSize={"sm"} fontWeight={"bold"} color={"gray"}>Sale {fmtWkdt(price, true)}</Text>
            <Spacer/>
            {cu.addr === address ? (
              <Button size={"sm"} onClick={saleOffer.removeSellOffer} isLoading={saleOffer.status === PROCESSING}>Unlist</Button>
            ) : (
              <Button size={"sm"} >Buy</Button>
            )}
          </Stack>
        )}
        { parseInt(pass.totalBalance) > 0 && (
          <Text fontSize={"sm"} fontWeight={"bold"} color={"cyan.500"}>Lockup: {fmtWkdt(pass.lockupAmount, false)} / {fmtWkdt(pass.totalBalance, true)}</Text>
        ) }
      </Stack>
    </Stack>
  )
}

export function SalePassItemSkeleton(){
  return(
    <Stack spacing={3} border="1px" boxShadow="xs" borderColor="gray.100" borderRadius={"lg"} height="400px"
           maxW={"250px"} p={4}
           direction={"column"}>
      <SkeletonCircle size={10}/>
      <Skeleton height="240px"/>
      <Spacer/>
      <Stack spacing={0}>
        <SkeletonText mt="4" noOfLines={4}/>
      </Stack>
    </Stack>
  )
}

export default function WrappedSalePassItem(props) {
  return (
    <Suspense fallback={<SalePassItemSkeleton />}>
      <SalePassItem {...props}/>
    </Suspense>
  )
}