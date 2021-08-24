import React, {Suspense} from 'react';
import {TheFooter} from "../../components/TheFooter";
import {useWkdtBalanceHook} from "../../hooks/use-wkdt-balance.hook";
import {
  Box, Center, Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, Stack,
} from "@chakra-ui/react"
import {fmtWkdt} from "../../util/fmt-wkdt";

export function Explore() {
  const factory = useWkdtBalanceHook("0x53ccab79353397a3")
  return (
    <Stack pl={4} pr={4} minH={"60vh"}>
      <StatGroup p={20}>
        <Stat>
          <StatLabel>Wakanda Factory</StatLabel>
          <StatNumber>{fmtWkdt(factory.balance, true)}</StatNumber>
          <StatHelpText>
            0x53ccab79353397a3
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Wakanda Foundation</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>
            0x53ccab79353397a3
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Stack>
  );
}

export function ExploreSkeleton() {
  return (
    <Center minH={"60vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedExplore() {
  return (
    <Suspense fallback={<ExploreSkeleton />}>
      <Explore/>
      <TheFooter/>
    </Suspense>
  )
}