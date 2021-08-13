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

function Index() {
  return (
    <Box pl={4} pr={4}>
      <Stack height={500} direction={"row"} mb={4}>
        <UserInfoCard address={"99999999"}/>
        <UserAvatar/>
      </Stack>
      <Stack>
        <Tabs>
          <TabList>
            <Tab><Heading fontSize={"md"}>Sale</Heading></Tab>
            <Tab><Heading fontSize={"md"}>Owned</Heading></Tab>
            <Tab><Heading fontSize={"md"}>Created</Heading></Tab>
            <Tab><Heading fontSize={"md"}>Liked</Heading></Tab>
            <Tab><Heading fontSize={"md"}>About</Heading></Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>four!</p>
            </TabPanel>
            <TabPanel>
              <p>About</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
}

export default Index;
