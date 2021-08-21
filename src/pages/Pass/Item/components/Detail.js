import React, {Suspense} from "react";
import {
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import {fmtWkdt} from "../../../../util/fmt-wkdt";
import TransferWkdtToPass from "./TransferWkdtToPass";
import {PROCESSING} from "../../../../global/constants";
import SellPass from "./SellPass";
import {TransferPass} from "./TransferPass";
import {BurnPass} from "./BurnPass";

export function Detail({pass}) {
  return (
    <Stack mt={4}>
      <Text fontWeight={"bold"} fontSize={"sm"}>Owner: {pass.pass.owner}</Text>
      <Text fontWeight={"bold"} fontSize={"sm"}>Idle balance: {fmtWkdt(pass.pass.idleBalance, true)}</Text>
      <Text fontWeight={"bold"} fontSize={"sm"}>Lockup amount: {fmtWkdt(pass.pass.lockupAmount, true)}</Text>
      <Text fontWeight={"bold"} fontSize={"sm"}>Total balance: {fmtWkdt(pass.pass.totalBalance, true)}</Text>
      <Stack direction={"row"}>
        <TransferWkdtToPass pass={pass}/>
        <Button size={"sm"} onClick={pass.withdraw}
                disabled={pass.status === PROCESSING || Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Withdraw</Button>
        <Button size={"sm"}
                disabled={pass.status === PROCESSING || Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Stake</Button>
        <SellPass pass={pass}/>
        <TransferPass pass={pass}/>
        <BurnPass pass={pass} />
      </Stack>

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