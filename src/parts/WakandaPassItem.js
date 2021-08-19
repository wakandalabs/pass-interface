import React, {Suspense} from "react";
import {AspectRatio, Flex, Heading, IconButton, Spacer, Stack, Text} from "@chakra-ui/react";
import {InfoOutlineIcon} from "@chakra-ui/icons";

export function WakandaPassItem({pass}) {
  console.log(pass)
  return(
    <Stack>
      <Flex border="1px" borderColor="gray.200" borderRadius={"lg"} height="400px" maxW={"250px"} p={4}
            direction={"column"}>

      </Flex>
    </Stack>
  )
}

export function WakandaPassItemSkeleton() {
  return(
    <Stack>
      <Heading>Pass</Heading>
    </Stack>
  )
}

export default function WrappedWakandaPassItem(props) {
  return(
    <Suspense fallback={<WakandaPassItemSkeleton />}>
      <WakandaPassItem {...props}/>
    </Suspense>
  )
}