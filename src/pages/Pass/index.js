import React from 'react';
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
import {UserInfoCard} from "./UserInfoCard";
import {UserAvatar} from "./UserAvatar";
import {SalePass} from "./SalePass";
import {OwnedPass} from "./OwnedPass";
import {CreatedPass} from "./CreatedPass";
import {LikedPass} from "./LikedPass";
import {About} from "./About";
import {useHistory} from "react-router-dom";
import qs from "qs";
import {HiddenPass} from "./HiddenPass";
import {useCurrentUser} from "../../hooks/use-current-user";

export function Pass() {
  const tabs = [
    {key: "sale", label: "Sale", path: "sale"},
    {key: "owned", label: "Owned", path: "owned"},
    {key: "created", label: "Created", path: "created"},
    {key: "hidden", label: "Hidden", path: "hidden"},
    {key: "liked", label: "Liked", path: "liked"},
    {key: "about", label: "About", path: "about"},
  ]

  const history = useHistory();
  const {tab} = qs.parse(history.location.search.replace(/^\?/, ''))
  const [tabIndex, setTabIndex] = React.useState(getTabIndex(tab))
  const [cu] = useCurrentUser()

  function getTabIndex(tab) {
    const index = tabs.findIndex((item) => item.key === tab)
    return (index < 0) ? 0 : index
  }

  const handleTabsChange = (index) => {
    setTabIndex(index)
    if (index === 0){
      history.push("pass")
    } else {
      history.push("pass?tab=" + tabs[index].path)
    }
  }

  return (
    <Box pl={4} pr={4}>
      <Stack height={500} direction={"row"} mb={4}>
        <UserInfoCard address={cu.addr}/>
        <UserAvatar/>
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
              <SalePass/>
            </TabPanel>
            <TabPanel>
              <OwnedPass/>
            </TabPanel>
            <TabPanel>
              <CreatedPass/>
            </TabPanel>
            <TabPanel>
              <HiddenPass/>
            </TabPanel>
            <TabPanel>
              <LikedPass/>
            </TabPanel>
            <TabPanel>
              <About/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
}

export default function WrappedPass() {
  return (
    <Pass/>
  )
}