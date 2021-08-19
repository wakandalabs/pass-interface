import React, {Suspense} from "react";
import {
  AspectRatio,
  Avatar,
  AvatarGroup, Button,
  Heading, Image,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import {fmtWkdt} from "../util/fmt-wkdt";

export function WakandaPassItem({pass}) {
  console.log(pass)
  return (
    <Stack spacing={3} border="2px" borderColor="gray.600" borderRadius={"lg"} height="400px" maxW={"250px"} p={4}
           direction={"column"}>
      <Stack direction={"row"} align={"center"}>
        <AvatarGroup size="sm" max={2}>
          <Avatar name={pass.originalOwner}/>
          <Avatar name={pass.owner}/>
        </AvatarGroup>
        <Spacer/>
        <Text fontSize={"xl"} fontWeight={"bold"}>#{pass.id}</Text>
      </Stack>
      <AspectRatio>
        <Image src="https://bit.ly/naruto-sage" alt="naruto" objectFit="cover" />
      </AspectRatio>
      <Spacer/>
      <Stack spacing={0}>
        <Text fontSize={"md"} fontWeight={"bold"}>{pass.metadata.title}</Text>
        <Text fontSize={"sm"}>{pass.metadata.description}</Text>
      </Stack>

      <Button size={"sm"}>Stake</Button>

    </Stack>
  )
}

export function WakandaPassItemSkeleton() {
  return (
    <Stack>
      <Heading>Pass</Heading>
    </Stack>
  )
}

export default function WrappedWakandaPassItem(props) {
  return (
    <Suspense fallback={<WakandaPassItemSkeleton/>}>
      <WakandaPassItem {...props}/>
    </Suspense>
  )
}