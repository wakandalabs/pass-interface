import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Heading,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text, useClipboard
} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";

function Pass() {
  const {hasCopied, onCopy} = useClipboard("address")

  return (
    <Box pl={16} pr={16}>
      <Stack height={500} direction={"row"} mb={4}>
        <Stack height={"100%"} width={"50%"} p={16} spacing={4}>
          <Avatar bg="teal.500"/>
          <Stack direction={"row"} align={"center"} spacing={2}>
            <Heading fontSize="xl">@ID</Heading>
            <Button size={"xs"} onClick={onCopy} width={36} colorScheme={"gray"} color={"gray"}>
              {hasCopied ? "Copied!" : "0xaddressdddddd"}
            </Button>
          </Stack>

          <Text>A collection of 1/1 Monsters by Des Lucréce</Text>
          <Spacer/>
          <Button leftIcon={<SmallAddIcon />}  width={28}>Follow</Button>
        </Stack>
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
