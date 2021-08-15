import React from 'react';
import {Box, Center, Heading, SimpleGrid, Stack} from "@chakra-ui/react";

function Index() {
  return (
    <Center>
      <Stack pl={4} pr={4} spacing={8} textAlign={"center"} maxW={"650"}>
        <Heading>Meet WKDT - Wakanda<br/>Governance Token</Heading>
        <Heading fontSize={"md"}>WKDT</Heading>
        <Heading fontSize={"3xl"}>How you can get WKDT</Heading>
        <Heading fontSize={"md"}>WKDT </Heading>
        <Heading fontSize={"3xl"}>How to use WKDT</Heading>
        <SimpleGrid minChildWidth="120px" spacing="12px">
          <Box height="80px">
            <Heading fontSize={"md"}>Hustle in Wakanda DAO</Heading>
          </Box>
          <Box height="80px">
            <Heading fontSize={"md"}>Vote for platform upgrades</Heading>
          </Box>
          <Box height="80px">
            <Heading fontSize={"md"}>Choose featured network</Heading>
          </Box>
          <Box height="80px">
            <Heading fontSize={"md"}>Participate in moderation</Heading>
          </Box>
        </SimpleGrid>
      </Stack>
    </Center>
  );
}

export default Index;
