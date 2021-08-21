import React, {Suspense} from 'react';
import {
  Stack,
  Heading,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Center, Box, IconButton, Skeleton
} from "@chakra-ui/react";
import {TransferToken} from "./components/TransferToken";
import {fmtWkdt} from "../../util/fmt-wkdt";
import {fmtFlow} from "../../util/fmt-flow";
import {useFlowBalanceHook} from "../../hooks/use-flow-balance.hook";
import {useWkdtBalanceHook} from "../../hooks/use-wkdt-balance.hook";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {IDLE, PROCESSING} from "../../global/constants";
import {BeatLoader} from "react-spinners";
import {RepeatIcon} from "@chakra-ui/icons";
import {TheFooter} from "../../components/TheFooter";

export function Wallet() {
  const [cu, loggedIn] = useCurrentUserHook()
  const wkdt = useWkdtBalanceHook(cu.addr)
  const flow = useFlowBalanceHook(cu.addr)

  if (!loggedIn || wkdt.balance === null) {
    return (
      <WalletSkeleton/>
    )
  }

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>My wallet</Heading>
        </Box>
        <StatGroup>
          <Stat>
            <Stack direction={"row"} align={"center"}>
              <StatLabel fontWeight={"bold"}>Wakanda Token</StatLabel>
              <IconButton aria-label={"refresh"} icon={<RepeatIcon/>} size={"xs"} onClick={wkdt.refresh}
                          isLoading={wkdt.status === PROCESSING}/>
            </Stack>
            <Stack direction={"row"} align={"baseline"} h={20}>
              {(wkdt.status === PROCESSING) && (
                <BeatLoader size={4}/>
              )}
              {(wkdt.status === IDLE) && (
                <StatNumber>{fmtWkdt(wkdt.balance)}</StatNumber>
              )}
              <Heading fontSize={"md"}>WKDT</Heading>
            </Stack>
            {(wkdt.status === IDLE) && (wkdt.balance != null) && (
              <StatHelpText mt={4}>
                <TransferToken/>
              </StatHelpText>
            )}
          </Stat>
          <Stat>
            <Stack direction={"row"} align={"center"}>
              <StatLabel fontWeight={"bold"}>Flow</StatLabel>
              <IconButton aria-label={"refresh"} icon={<RepeatIcon/>} size={"xs"} onClick={flow.refresh}
                          isLoading={flow.status === PROCESSING}/>
            </Stack>
            <Stack direction={"row"} align={"baseline"} h={20}>
              {(flow.status === PROCESSING) && (
                <BeatLoader size={4}/>
              )}
              {(flow.status === IDLE) && (
                <StatNumber>{fmtFlow(flow.balance)}</StatNumber>
              )}
              <Heading fontSize={"md"}>FLOW</Heading>
            </Stack>
          </Stat>
        </StatGroup>
        <Stack h={20}/>
      </Stack>
    </Center>
  );
}

export function WalletSkeleton() {
  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>My wallet</Heading>
        </Box>
        <StatGroup>
          <Stat>
            <Stack direction={"row"} align={"center"}>
              <StatLabel fontWeight={"bold"}>Wakanda Token</StatLabel>
              <IconButton aria-label={"refresh"} icon={<RepeatIcon/>} size={"xs"}
                          isLoading/>
            </Stack>
            <Stack h={20}>
              <Skeleton w={"140px"} h={"30px"} mt={2}/>
            </Stack>
            <StatHelpText mt={4}>
              <TransferToken/>
            </StatHelpText>
          </Stat>
          <Stat>
            <Stack direction={"row"} align={"center"}>
              <StatLabel fontWeight={"bold"}>Flow</StatLabel>
              <IconButton aria-label={"refresh"} icon={<RepeatIcon/>} size={"xs"}
                          isLoading/>
            </Stack>
            <Skeleton w={"140px"} h={"30px"} mt={2}/>
          </Stat>
        </StatGroup>
        <Stack h={20}/>
      </Stack>
    </Center>
  )
}

export default function WrappedWallet() {
  return (
    <Suspense fallback={<WalletSkeleton/>}>
      <Wallet/>
      <TheFooter/>
    </Suspense>
  )
}
