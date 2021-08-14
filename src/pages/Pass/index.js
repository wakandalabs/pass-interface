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

function Index() {
  const history = useHistory();
  const tab = qs.parse(history.location.search.replace(/^\?/, ''))

  return (
    <Box pl={4} pr={4}>
      <Stack height={500} direction={"row"} mb={4}>
        <UserInfoCard address={"99999999"}/>
        <UserAvatar/>
      </Stack>
      <Stack>
        <Tabs>
          <TabList>
            <Tab><Heading fontSize={"md"} onClick={() => history.push("pass")}>Sale</Heading></Tab>
            <Tab><Heading fontSize={"md"} onClick={() => history.push("pass?tab=owned")}>Owned</Heading></Tab>
            <Tab><Heading fontSize={"md"} onClick={() => history.push("pass?tab=created")}>Created</Heading></Tab>
            <Tab><Heading fontSize={"md"} onClick={() => history.push("pass?tab=liked")}>Liked</Heading></Tab>
            <Tab><Heading fontSize={"md"} onClick={() => history.push("pass?tab=about")}>About</Heading></Tab>
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
