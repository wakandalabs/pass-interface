import React, {Suspense} from "react";
import {Badge, Button, Divider, Spacer, Stack, Text} from "@chakra-ui/react";
import {fmtWkdt} from "../../../../util/fmt-wkdt";
export function Stake({pass}){
  return (
    <Stack spacing={6} mt={4}>
      <Stack direction={"row"} align={"center"}>
        <Text fontWeight={"bold"} fontSize={"sm"}>ID: {pass.pass.stakingInfo.id}</Text>
        <Badge>VIP: {pass.pass.vipTier}</Badge>
      </Stack>
      <Stack direction={"row"} align={"center"}>
        <Text fontWeight={"bold"}
              fontSize={"sm"}>Staked: {fmtWkdt(pass.pass.stakingInfo.tokensStaked, true)}</Text>
        <Spacer/>
        <Button size={"sm"} disabled={Number(pass.pass.stakingInfo.tokensStaked) === 0}>Request
          unstake</Button>
      </Stack>
      <Stack direction={"row"} align={"center"}>
        <Text fontWeight={"bold"} fontSize={"sm"}>Requested to
          unstake: {fmtWkdt(pass.pass.stakingInfo.tokensRequestedToUnstake, true)}</Text>
        <Spacer/>
        <Button size={"sm"}
                disabled={Number(pass.pass.stakingInfo.tokensRequestedToUnstake) === 0}>Restake</Button>
      </Stack>
      <Stack direction={"row"} align={"center"}>
        <Text fontWeight={"bold"}
              fontSize={"sm"}>Committed: {fmtWkdt(pass.pass.stakingInfo.tokensCommitted, true)}</Text>
      </Stack>
      <Divider/>
      <Stack direction={"row"} align={"center"}>
        <Text fontWeight={"bold"}
              fontSize={"sm"}>Rewarded: {fmtWkdt(pass.pass.stakingInfo.tokensRewarded, true)}</Text>
        <Spacer/>
        <Button size={"sm"} disabled={Number(pass.pass.stakingInfo.tokensRewarded) === 0}>Receive</Button>
        <Button size={"sm"} disabled={Number(pass.pass.stakingInfo.tokensRewarded) === 0}>Stake</Button>
      </Stack>
      <Stack direction={"row"} align={"center"}>
        <Text fontWeight={"bold"}
              fontSize={"sm"}>Unstaked: {fmtWkdt(pass.pass.stakingInfo.tokensUnstaked, true)}</Text>
        <Spacer/>
        <Button size={"sm"} disabled={Number(pass.pass.stakingInfo.tokensUnstaked) === 0}>Receive</Button>
      </Stack>
    </Stack>
  )
}

export function StakeSkeleton(){
  return (
    <></>
  )
}

export default function WrappedStakeSkeleton(props){
  return(
    <Suspense fallback={<StakeSkeleton/>}>
      <Stake {...props}/>
    </Suspense>
  )
}