import React, {Suspense} from "react";
import {useHistory} from "react-router-dom";
import {
  SkeletonText,
  Stack,
  Text,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel, Button, Spacer, Divider, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Skeleton, Badge,
} from "@chakra-ui/react";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import {useWakandaPassDetail} from "../../../hooks/use-pass-detail.hook";
import {fmtWkdt} from "../../../util/fmt-wkdt";
import {toDate} from "../../../global/common";

export function PassItem() {
  const history = useHistory()
  const [cu, loggedIn] = useCurrentUserHook()
  const id = Number(history.location.pathname.slice(6))
  const pass = useWakandaPassDetail(cu.addr, id)

  if (!loggedIn || pass.pass === false) {
    return <PassItemSkeleton/>
  }

  const schedule = Object.entries(pass.pass.lockupSchedule)
  console.log(pass.pass.stakingInfo)

  return (
    <Stack pl={4} pr={4} minH={"60vh"} direction={"row"} spacing={8}>
      <Stack width={"60%"}>
        <Skeleton h={"80vh"}/>
      </Stack>
      <Stack width={"40%"} spacing={6}>
        <Stack>
          <Heading>{pass.pass.metadata.title} #{pass.pass.id}</Heading>
          <Text color={"gray"} fontWeight={"bold"}>Not for sale</Text>
        </Stack>

        <Text fontWeight={"bold"}>{pass.pass.metadata.description}</Text>

        <Text fontWeight={"bold"} fontSize={"sm"}>Original owner: {pass.pass.originalOwner}</Text>

        <Tabs>
          <TabList>
            <Tab fontWeight={"bold"}>Detail</Tab>
            <Tab fontWeight={"bold"}>Lockup</Tab>
            <Tab fontWeight={"bold"}>Stake</Tab>
            <Tab fontWeight={"bold"}>Stamp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack mt={4}>
                <Text fontWeight={"bold"} fontSize={"sm"}>Owner: {pass.pass.owner}</Text>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={6} mt={4}>
                <Text fontWeight={"bold"} fontSize={"sm"}>Lockup
                  amount: {fmtWkdt(pass.pass.lockupAmount, false)} / {fmtWkdt(pass.pass.totalBalance, true)}</Text>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"sm"}>Idle balance: {fmtWkdt(pass.pass.idleBalance, true)}</Text>
                  <Spacer/>
                  <Button size={"sm"} onClick={pass.withdraw}
                          disabled={Number(pass.pass.idleBalance) === 0 || isNaN(Number(pass.pass.idleBalance))}>Receive</Button>
                </Stack>
                <Divider/>
                <Table variant="simple">
                  <TableCaption>Lockup schedule</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Time</Th>
                      <Th>lockup</Th>
                      <Th isNumeric>WKDT</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {schedule.map((item) => (
                      <Tr>
                        <Td>
                          <Text>{toDate(Number(item[0] * 1000))}</Text>
                        </Td>
                        <Td>{Number(item[1])}</Td>
                        <Td isNumeric>0</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={6} mt={4}>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"sm"}>ID: {pass.pass.stakingInfo.id}</Text>
                  <Badge>VIP: {pass.pass.vipTier}</Badge>
                </Stack>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"sm"}>Staked: {fmtWkdt(pass.pass.stakingInfo.tokensStaked, true)}</Text>
                  <Spacer/>
                  <Button size={"sm"}>Request unstake</Button>
                </Stack>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"sm"}>Requested to unstake: {fmtWkdt(pass.pass.stakingInfo.tokensRequestedToUnstake, true)}</Text>
                  <Spacer/>
                  <Button size={"sm"} disabled={Number(pass.pass.stakingInfo.tokensRequestedToUnstake) === 0}>Restake</Button>
                </Stack>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"sm"}>Committed: {fmtWkdt(pass.pass.stakingInfo.tokensCommitted, true)}</Text>
                </Stack>
                <Divider/>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"sm"}>Rewarded: {fmtWkdt(pass.pass.stakingInfo.tokensRewarded, true)}</Text>
                  <Spacer/>
                  <Button size={"sm"} disabled={Number(pass.pass.stakingInfo.tokensRewarded) === 0}>Receive</Button>
                </Stack>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"sm"}>Unstaked: {fmtWkdt(pass.pass.stakingInfo.tokensUnstaked, true)}</Text>
                  <Spacer/>
                  <Button size={"sm"} disabled={Number(pass.pass.stakingInfo.tokensUnstaked) === 0}>Receive</Button>
                </Stack>
              </Stack>



            </TabPanel>
            <TabPanel>
              {/*<Text>{pass.pass.stamps}</Text>*/}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  )
}

export function PassItemSkeleton() {
  return (
    <Stack pl={4} pr={4} minH={"60vh"} direction={"row"} spacing={12}>
      <Stack width={"60%"}>
        <Skeleton h={"100%"}/>
      </Stack>
      <Stack width={"40%"} spacing={6}>
        <SkeletonText noOfLines={6} spacing={12}/>
      </Stack>
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