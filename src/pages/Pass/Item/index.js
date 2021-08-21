import React, {Suspense} from "react";
import {useHistory} from "react-router-dom";
import {Box, SkeletonText, Stack, Text} from "@chakra-ui/react";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import {useWakandaPassDetail} from "../../../hooks/use-pass-detail.hook";
import {fmtWkdt} from "../../../util/fmt-wkdt";

export function PassItem() {
  const history = useHistory()
  const [cu, loggedIn] = useCurrentUserHook()
  const id = Number(history.location.pathname.slice(6))
  const pass = useWakandaPassDetail(cu.addr, id)

  console.log(pass)

  if (!loggedIn) {
    return <PassItemSkeleton/>
  }

  return (
    <Stack pl={4} pr={4} minH={"60vh"}>
      <Text>#{pass.pass.id}</Text>
      <Text>idleBalance:{fmtWkdt(pass.pass.idleBalance, true)}</Text>
      <Text>lockupAmount:{fmtWkdt(pass.pass.lockupAmount, true)}</Text>
      {/*<Text>{pass.pass.lockupSchedule}</Text>*/}
      {/*<Text>{pass.pass.metadata}</Text>*/}
      <Text>originalOwner:{pass.pass.originalOwner}</Text>
      <Text>owner:{pass.pass.owner}</Text>
      {/*<Text>{pass.pass.stakingInfo}</Text>*/}
      {/*<Text>{pass.pass.stamps}</Text>*/}
      <Text>{fmtWkdt(pass.pass.totalBalance, true)}</Text>
      <Text>VIP: {pass.pass.vipTier}</Text>










    </Stack>
  )
}

export function PassItemSkeleton() {
  return (
    <Stack pl={4} pr={4} minH={"60vh"}>
      <SkeletonText/>
    </Stack>
  )
}

export default function WrappedPassItem() {
  return (
    <Suspense fallback={<PassItemSkeleton/>}>
      <PassItem/>
    </Suspense>
  )
}