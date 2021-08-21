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
  TabPanel, Button, Spacer, Divider, Table, TableCaption, Thead, Tr, Th, Tbody, Td,
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

  return (
    <Stack pl={4} pr={4} minH={"60vh"} direction={"row"} spacing={12}>
      <Stack width={"60%"}>
        <Text>Media in Pass</Text>
      </Stack>
      <Stack width={"40%"} spacing={6}>
        <Stack>
          <Heading>{pass.pass.metadata.title} #{pass.pass.id}</Heading>
          <Text color={"gray"} fontWeight={"bold"}>Not for sale</Text>
        </Stack>

        <Text fontWeight={"bold"}>{pass.pass.metadata.description}</Text>

        <Stack>
          <Text fontWeight={"bold"} fontSize={"sm"}>Original owner</Text>
          <Text fontWeight={"bold"}>{pass.pass.originalOwner}</Text>
        </Stack>

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
                <Text fontWeight={"bold"} fontSize={"sm"}>Owner</Text>
                <Text fontWeight={"bold"}>{pass.pass.owner}</Text>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={6} mt={4}>
                <Text fontWeight={"bold"} fontSize={"sm"}>Lockup
                  amount: {fmtWkdt(pass.pass.lockupAmount, false)} / {fmtWkdt(pass.pass.totalBalance, true)}</Text>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"sm"}>Idle balance: {fmtWkdt(pass.pass.idleBalance, true)}</Text>
                  <Spacer/>
                  <Button size={"sm"}
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
                          <Text>{toDate(Number(item[0]*1000))}</Text>
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
              <p>Stake</p>
              <Text fontWeight={"bold"}>VIP: {pass.pass.vipTier}</Text>
              {/*<Text>{pass.pass.stakingInfo}</Text>*/}
            </TabPanel>
            <TabPanel>
              <p>Stamp</p>
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