import React, {Suspense} from "react";
import {
  Button, Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import {fmtWkdt} from "../../../../util/fmt-wkdt";
import {PROCESSING} from "../../../../global/constants";
import SalePass from "./SalePass";
import {useCurrentUserHook} from "../../../../hooks/use-current-user.hook";
import qs from "qs";
import {useSaleOfferIdsHook} from "../../../../hooks/use-sale-offer-ids.hook";
import {useHistory} from "react-router-dom";
import {TransferPass} from "./TransferPass";

export function Detail({pass}) {
  const [cu] = useCurrentUserHook()
  const history = useHistory()
  const {sale} = qs.parse(history.location.search.replace(/^\?/, ''))
  const saleOffers = useSaleOfferIdsHook(pass.pass.owner)
  if(saleOffers.saleOfferIds.indexOf(Number(sale))>=0){
    console.log("Sale")
  }

  return (
    <Stack mt={4}>
      <Text fontWeight={"bold"} fontSize={"sm"}>Owner: {pass.pass.owner}</Text>
      <Text fontWeight={"bold"} fontSize={"sm"}>Idle balance: {fmtWkdt(pass.pass.idleBalance, true)}</Text>
      <Text fontWeight={"bold"} fontSize={"sm"}>Lockup amount: {fmtWkdt(pass.pass.lockupAmount, true)}</Text>
      <Text fontWeight={"bold"} fontSize={"sm"}>Total balance: {fmtWkdt(pass.pass.totalBalance, true)}</Text>
      <Spacer/>
      {pass.pass.owner === cu.addr && (
        <Stack direction={"row"}>
          <Button size={"sm"} onClick={pass.withdraw}
                  disabled={pass.status === PROCESSING || Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Withdraw</Button>
          <SalePass pass={pass}/>
          <TransferPass pass={pass}/>
        </Stack>
      )}
    </Stack>
  )
}

export function DetailSkeleton() {
  return (
    <></>
  )
}

export default function WrappedDetailSkeleton(props) {
  return (
    <Suspense fallback={<DetailSkeleton/>}>
      <Detail {...props}/>
    </Suspense>
  )
}