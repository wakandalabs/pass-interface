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
import {UserInfoCard} from "../parts/UserInfoCard";

function Pass() {
  return (
    <Box pl={16} pr={16}>
      <Stack height={500} direction={"row"} mb={4}>
        <UserInfoCard address={"99999999"}/>
        <Stack height={"100%"} width={"50%"}>
        </Stack>
      </Stack>
      <Stack>
        <Tabs>
          <TabList>
            <Tab><Heading fontSize={"md"}>Saled</Heading></Tab>
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

export default Pass;
