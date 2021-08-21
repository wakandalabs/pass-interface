import React, {Suspense} from "react";
import {Button, Spacer, Stack, Text} from "@chakra-ui/react";
import {fmtWkdt} from "../../../../util/fmt-wkdt";

export function Detail({pass}) {
  return (
    <Stack mt={4}>
      <Text fontWeight={"bold"} fontSize={"sm"}>Owner: {pass.pass.owner}</Text>
      <Text fontWeight={"bold"} fontSize={"sm"}>Idle balance: {fmtWkdt(pass.pass.idleBalance, true)}</Text>
      <Stack direction={"row"}>
        <Button size={"sm"}
                disabled={Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Deposit</Button>
        <Button size={"sm"} onClick={pass.withdraw}
                       disabled={Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Withdraw</Button>
        <Button size={"sm"}
                disabled={Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Stake</Button>
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