import React, {Suspense} from "react";
import {
  Avatar,
  AvatarGroup, IconButton, Skeleton,
  SkeletonCircle, SkeletonText,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react";
import {useProfileHook} from "../../../hooks/use-profile.hook";
import {useWakandaPassDetail} from "../../../hooks/use-pass-detail.hook";
import {useHistory} from "react-router-dom";
import {FiMoreHorizontal} from "react-icons/all";

export function WakandaPassItem({address, id}) {
  const pass = useWakandaPassDetail(address, id).pass
  const originOwner = useProfileHook(pass.originalOwner)
  const owner = useProfileHook(pass.owner)
  const history = useHistory()

  return (
    <Stack spacing={3} border="1px" boxShadow="xs" borderColor="gray.100" rounded="md" height="400px" maxW={"250px"}
           p={4}
           direction={"column"} onClick={() => history.push("/pass/" + id)}>
      <Stack direction={"row"} align={"center"}>
        <AvatarGroup size="sm" max={2}>
          <Avatar name={originOwner.profile.name} src={originOwner.profile.avatar} colorScheme={"cyan"}/>
          <Avatar name={owner.profile.name} src={originOwner.profile.avatar}/>
        </AvatarGroup>
        <Spacer/>
        <IconButton aria-label={"more"} icon={<FiMoreHorizontal />} variant={"ghost"} size={"sm"}/>
      </Stack>
      {/*<AspectRatio>*/}
      {/*  <Image src="" alt="naruto" objectFit="cover" />*/}
      {/*</AspectRatio>*/}
      <Spacer/>
      <Stack spacing={0}>
        <Text fontSize={"md"} fontWeight={"bold"}>{pass.metadata.title} #{pass.id}</Text>
        <Text fontSize={"sm"} fontWeight={"bold"} color={"gray"}>Not for sale</Text>
        <Text fontSize={"sm"} fontWeight={"bold"} color={"cyan.500"}>Stake:</Text>
      </Stack>
    </Stack>
  )
}

export function WakandaPassItemSkeleton() {
  return (
    <Stack spacing={3} border="1px" boxShadow="xs" borderColor="gray.100" borderRadius={"lg"} height="400px"
           maxW={"250px"} p={4}
           direction={"column"}>
      <SkeletonCircle size={10}/>
      <Skeleton height="240px"/>
      <Spacer/>
      <Stack spacing={0}>
        <SkeletonText mt="4" noOfLines={4}/>
      </Stack>
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