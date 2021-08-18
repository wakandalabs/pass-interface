import React, {Suspense} from 'react';
import {Box, Center, Heading, List, ListIcon, ListItem, SimpleGrid, Skeleton, Stack, Text} from "@chakra-ui/react";
import {MdCheckCircle} from "react-icons/all";

export function Wkdt() {
  return (
    <Center minH={"40vh"}>
      <Stack pl={4} pr={4} spacing={12} textAlign={"center"} maxW={"650"}>
        <Heading>Meet WKDT</Heading>
        <Text fontSize={"md"}>WKDT is the function and governance token of the Wakanda ecological community.
          It is cross-chain token runs on the Flow blockchain currently, and will soon be deployed to Solana and
          Ethereum. Currently, WKDT is not listed on any exchange.</Text>
        <Heading fontSize={"3xl"}>How you can get WKDT</Heading>
        <Center>
          <List textAlign={"start"}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="cyan.500"/>
              Purchase Wakanda Eco-Community products to get a complimentary WKDT
            </ListItem>
            <ListItem >
              <ListIcon as={MdCheckCircle} color="cyan.500"/>
              Use WKDT to participate in staking and mining
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="cyan.500"/>
              Participate in Wakanda community activities and have the opportunity to receive airdrop rewards
            </ListItem>
          </List>
        </Center>


        <Heading fontSize={"3xl"}>How to use WKDT</Heading>
        <SimpleGrid minChildWidth="120px" spacing="12px">
          <Box height="80px">
            <Text fontSize={"md"}>Hustle in Wakanda DAO</Text>
          </Box>
          <Box height="80px">
            <Text fontSize={"md"}>Vote for platform upgrades</Text>
          </Box>
          <Box height="80px">
            <Text fontSize={"md"}>Choose featured network</Text>
          </Box>
          <Box height="80px">
            <Text fontSize={"md"}>Participate in moderation</Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Center>
  );
}

export function WkdtSkeleton() {
  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} textAlign={"center"} maxW={"650"} w={"100%"} minH={"60vh"}>
        <Skeleton h={"30px"}/>
        <Skeleton h={"30px"}/>
        <Skeleton h={"90px"}/>
      </Stack>
    </Center>
  )
}

export default function WrappedWkdt() {
  return (
    <Suspense fallback={<WkdtSkeleton/>}>
      <Wkdt/>
    </Suspense>
  )
}