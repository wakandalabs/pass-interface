import React from 'react';
import {
  Stack,
  Heading,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Button, Text, Switch
} from "@chakra-ui/react";
import {TransferToken} from "./TransferToken";

function Index() {
  return (
    <Stack pl={4} pr={4} spacing={4}>
      <Stack>
        <Heading fontSize={"md"}>My Wakanda Token</Heading>
      </Stack>
      <StatGroup border="1px" borderRadius={8} borderColor={"gray.300"} p={4}>
        <Stat>
          <StatLabel>Balance</StatLabel>
          <StatNumber>345,670 WKDT</StatNumber>
          <StatHelpText mt={4}>
            <Stack direction={"row"}>
              <TransferToken address={"aassssssss"}/>
            </Stack>
          </StatHelpText>
        </Stat>
      </StatGroup>
      <Stack>
        <Heading fontSize={"md"} mt={4}>My Stake on Wakanda Pass</Heading>
        <Stack direction={"row"} align={"center"}>
          <Text fontSize={"sm"}>Automatically restake rewards</Text>
          <Switch size={"sm"}/>
        </Stack>
      </Stack>
      <StatGroup border="1px" borderRadius={8} borderColor={"gray.300"} p={4}>
        <Stat>
          <StatLabel>Current Stake</StatLabel>
          <StatNumber>345,670 WKDT</StatNumber>
          <StatHelpText mt={4}>
            <Button size={"sm"}>Unstake</Button>
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Add Stake</StatLabel>
          <StatNumber>45 WKDT</StatNumber>
          <StatHelpText mt={4}>
            <Button size={"sm"}>Stake</Button>
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Request Unstake</StatLabel>
          <StatNumber>0 WKDT</StatNumber>
          <StatHelpText mt={4}>
            <Button size={"sm"}>Restake</Button>
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Next Round Stake</StatLabel>
          <StatNumber>0 WKDT</StatNumber>
        </Stat>
      </StatGroup>
      <Stack>
        <Heading fontSize={"md"} mt={4}>My Rewards</Heading>
      </Stack>
      <StatGroup border="1px" borderRadius={8} borderColor={"gray.300"} p={4}>
        <Stat>
          <StatLabel>Epoch Rewards</StatLabel>
          <StatNumber>345,670 WKDT</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Had Distribute Rewards</StatLabel>
          <StatNumber>45 WKDT</StatNumber>
          <StatHelpText mt={4}>
            <Button size={"sm"}>Receive</Button>
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Unstaking</StatLabel>
          <StatNumber>0 WKDT</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Had Unstake</StatLabel>
          <StatNumber>0 WKDT</StatNumber>
          <StatHelpText mt={4}>
            <Button size={"sm"}>Receive</Button>
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Stack>
  );
}

export default Index;
