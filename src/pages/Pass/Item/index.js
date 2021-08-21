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
  TabPanel, Skeleton,
} from "@chakra-ui/react";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";
import {useWakandaPassDetail} from "../../../hooks/use-pass-detail.hook";
import Detail from "./components/Detail";
import Lockup from "./components/Lockup";
import Stake from "./components/Stake";
import Stamp from "./components/Stamp";

export function PassItem() {
  const history = useHistory()
  const [cu, loggedIn] = useCurrentUserHook()
  const id = Number(history.location.pathname.slice(6))
  const pass = useWakandaPassDetail(cu.addr, id)

  if (!loggedIn || pass.pass === false) {
    return <PassItemSkeleton/>
  }

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
              <Detail pass={pass}/>
            </TabPanel>
            <TabPanel>
              <Lockup pass={pass}/>
            </TabPanel>
            <TabPanel>
              <Stake pass={pass}/>
            </TabPanel>
            <TabPanel>
              <Stamp pass={pass}/>
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