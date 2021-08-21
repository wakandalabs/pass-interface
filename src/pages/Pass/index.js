import React, {Suspense} from 'react';
import {
  Box,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import UserInfo, {UserInfoSkeleton} from "./components/UserInfo";
import SalePass from "./components/SalePass";
import OwnedPass from "./components/OwnedPass";
import LikedPass from "./components/LikedPass";
import About from "./components/About";
import {useHistory} from "react-router-dom";
import qs from "qs";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";

export function Account() {
  const tabs = [
    {key: "sale", label: "Sale", path: "sale"},
    {key: "owned", label: "Owned", path: "owned"},
    {key: "liked", label: "Liked", path: "liked"},
    {key: "about", label: "About", path: "about"},
  ]

  const history = useHistory();
  const {tab} = qs.parse(history.location.search.replace(/^\?/, ''))
  const [tabIndex, setTabIndex] = React.useState(getTabIndex(tab))
  const [user, loggedIn] = useCurrentUserHook()
  const address = user.addr

  function getTabIndex(tab) {
    const index = tabs.findIndex((item) => item.key === tab)
    return (index < 0) ? 0 : index
  }

  const handleTabsChange = (index) => {
    setTabIndex(index)
    if (index === 0) {
      history.push("pass")
    } else {
      history.push("pass?tab=" + tabs[index].path)
    }
  }

  if (!loggedIn) {
    return (
      <UserInfoSkeleton />
    )
  }

  return (
    <Box pl={4} pr={4} minH={"60vh"}>
      <Stack height={500} direction={"row"} mb={4}>
        <UserInfo address={address}/>
      </Stack>
      <Stack>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            {tabs.map((tab, index) => (
              <Tab key={index}><Heading fontSize={"md"}>{tab.label}</Heading></Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <SalePass address={address}/>
            </TabPanel>
            <TabPanel>
              <OwnedPass address={address}/>
            </TabPanel>
            <TabPanel>
              <LikedPass address={address}/>
            </TabPanel>
            <TabPanel>
              <About address={address}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
}

export default function WrappedAccount() {
  return (
    <Suspense fallback={<UserInfoSkeleton />}>
      <Account/>
    </Suspense>
  )
}