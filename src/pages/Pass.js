import React from 'react';
import {Box, Button, Heading, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";

function Pass() {
  return (
    <Box pl={16} pr={16}>
      <Box height={500}>
        Avatar
        Name
        <Button> + Follow</Button>
      </Box>
      <Box>
        <Tabs>
          <TabList>
            <Tab><Heading size={"sm"}>Saled</Heading></Tab>
            <Tab><Heading size={"sm"}>Owned</Heading></Tab>
            <Tab><Heading size={"sm"}>Created</Heading></Tab>
            <Tab><Heading size={"sm"}>Liked</Heading></Tab>
            <Tab><Heading size={"sm"}>About</Heading></Tab>
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
      </Box>
    </Box>
  );
}

export default Pass;
