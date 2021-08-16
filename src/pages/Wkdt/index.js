import React, {Suspense} from 'react';
import {Box, Center, Heading, SimpleGrid, Skeleton, Stack} from "@chakra-ui/react";

export function Wkdt() {
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

export function WkdtSkeleton() {
  return (
    <Center>
      <Stack pl={4} pr={4} spacing={8} textAlign={"center"} maxW={"650"} w={"100%"}>
        <Skeleton h={"30px"} />
        <Skeleton h={"30px"} />
        <Skeleton h={"90px"} />
      </Stack>
    </Center>
  )
}

export default function WrappedWkdt() {
  return (
    <Suspense fallback={<WkdtSkeleton />}>
      <Wkdt />
    </Suspense>
  )
}