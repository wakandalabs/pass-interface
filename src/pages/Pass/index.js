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

function Index() {
  const tabs = [
    {key: "sale", label: "Sale"},
    {key: "owned", label: "Owned"},
    {key: "created", label: "Created"},
    {key: "hidden", label: "Hidden"},
    {key: "liked", label: "Liked"},
    {key: "about", label: "About"},
  ]

  const history = useHistory();
  const {tab} = qs.parse(history.location.search.replace(/^\?/, ''))
  const [tabIndex, setTabIndex] = React.useState(getTabIndex(tab))

  function getTabIndex(tab) {
    const index = tabs.findIndex((item) => item.key === tab)
    return (index < 0) ? 0 : index
  }

  const handleTabsChange = (index) => {
    setTabIndex(index)
    if (index === 0){
      history.push("pass")
    }else{
      history.push("pass?tab=" + tabs[index].key)
    }
  }

  return (
    <Box pl={4} pr={4}>
      <Stack height={500} direction={"row"} mb={4}>
        <UserInfoCard address={"99999999"}/>
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

export default Index;
