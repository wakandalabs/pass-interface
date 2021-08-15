import React from 'react';
import {
  Stack,
  Heading,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Button, Text, Switch, Center, Spacer, Box, Divider
} from "@chakra-ui/react";
import {TransferToken} from "./TransferToken";

function Index() {
  return (
    <Center>
      <Stack pl={4} pr={4} spacing={4} w={650}>
        <Heading>My wallet</Heading>
        <Divider/>
        <StatGroup>
          <Stat>
            <StatLabel>balance</StatLabel>
            <Stack direction={"row"} align={"baseline"}>
              <StatNumber>345,670</StatNumber>
              <Heading fontSize={"md"}>WKDT</Heading>
            </Stack>
            <StatHelpText mt={4}>
              <TransferToken/>
            </StatHelpText>
          </Stat>
        </StatGroup>
        <Divider/>
        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"sm"}>Automatically restake rewards</Heading>
          <Switch size={"sm"}/>
        </Stack>
        <Box spacing={0}>
          <Text fontSize={"sm"} color={"gray.500"}>Current stake amount</Text>
          <Stack direction={"row"} align={"center"}>
            <Heading fontSize={"sm"}>200 WKDT</Heading>
            <Spacer/>
            <Button size={"sm"}>Unstake</Button>
          </Stack>
        </Box>
        <Stack spacing={1}>
          <Text fontSize={"sm"} color={"gray.500"}>Add stake token</Text>
          <Stack direction={"row"} align={"center"}>
            <Heading fontSize={"sm"}>200 WKDT</Heading>
            <Spacer/>
            <Button size={"sm"}>Stake</Button>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Text fontSize={"sm"} color={"gray.500"}>Request for cancellation of stake amount</Text>
          <Stack direction={"row"} align={"center"}>
            <Heading fontSize={"sm"}>200 WKDT</Heading>
            <Spacer/>
            <Button size={"sm"}>Restake</Button>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Text fontSize={"sm"} color={"gray.500"}>Second epoch of stake amount</Text>
          <Heading fontSize={"sm"}>200 WKDT</Heading>
        </Stack>
        <Stack spacing={3}>
          <Text fontSize={"sm"} color={"gray.500"}>Second epoch start time</Text>
          <Heading fontSize={"sm"}>2021年8月17日</Heading>
        </Stack>
        <Divider/>

        <Stack spacing={3}>
          <Text fontSize={"sm"} color={"gray.500"}>Calculated rewards for this epoch</Text>
          <Heading fontSize={"sm"}>200 WKDT</Heading>
        </Stack>

        <Stack spacing={1}>
          <Text fontSize={"sm"} color={"gray.500"}>Rewards already distributed</Text>
          <Stack direction={"row"} align={"center"}>
            <Heading fontSize={"sm"}>200 WKDT</Heading>
            <Spacer/>
            <Button size={"sm"}>Receive</Button>
          </Stack>
        </Stack>

        <Divider/>

        <Stack spacing={3}>
          <Text fontSize={"sm"} color={"gray.500"}>Unstaking token</Text>
          <Heading fontSize={"sm"}>200 WKDT</Heading>
        </Stack>

        <Stack spacing={1}>
          <Text fontSize={"sm"} color={"gray.500"}>Unstaked token</Text>
          <Stack direction={"row"} align={"center"}>
            <Heading fontSize={"sm"}>200 WKDT</Heading>
            <Spacer/>
            <Button size={"sm"}>Receive</Button>
          </Stack>
        </Stack>
        <Stack h={20}/>
      </Stack>
    </Center>
  );
}

export default Index;
