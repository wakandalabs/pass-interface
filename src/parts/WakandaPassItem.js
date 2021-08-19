import React, {Suspense} from "react";
import {
  Avatar,
  AvatarGroup, Button,
  Heading,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import {useWakandaProfileHook} from "../hooks/use-wakanda-profile.hook";

export function WakandaPassItem({pass}) {
  const originOwner = useWakandaProfileHook(pass.originalOwner)
  const owner = useWakandaProfileHook(pass.owner)

  return (
    <Stack spacing={3} border="2px" borderColor="gray.600" borderRadius={"lg"} height="400px" maxW={"250px"} p={4}
           direction={"column"}>
      <Stack direction={"row"} align={"center"}>
        <AvatarGroup size="sm" max={2}>
          <Avatar name={originOwner.profile.name} src={originOwner.profile.avatar} colorScheme={"cyan"}/>
          <Avatar name={owner.profile.name} src={originOwner.profile.avatar}/>
        </AvatarGroup>
        <Spacer/>
        <Text fontSize={"xl"} fontWeight={"bold"}>#{pass.id}</Text>
      </Stack>
      {/*<AspectRatio>*/}
      {/*  <Image src="" alt="naruto" objectFit="cover" />*/}
      {/*</AspectRatio>*/}
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