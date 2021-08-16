import {
  Avatar,
  Button,
  Heading,
  IconButton, Skeleton, SkeletonCircle,
  Spacer,
  Stack,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import React, {Suspense} from "react";
import {useWakandaProfile} from "../../hooks/use-wakanda-profile";
import {useHistory} from "react-router-dom";

export function UserInfoCard({address}) {
  const {hasCopied, onCopy} = useClipboard(address)
  const profile = useWakandaProfile(address)
  const history = useHistory()

  return (
    <Stack height={"100%"} width={"50%"} p={16} spacing={3}>
      <Avatar bg="teal.500"/>
      <Stack direction={"row"} align={"center"} spacing={4}>
        <Heading fontSize="xl">{profile.profile.name}</Heading>
        <Stack>
          <Button size={"xs"} onClick={onCopy} width={36} colorScheme={"gray"} color={"gray"}>
            {hasCopied ? "Copied!" : address}
          </Button>
        </Stack>
      </Stack>
      <Text>{profile.profile.bio}</Text>
      <Spacer/>
      <Stack direction={"row"} spacing={3}>
        <IconButton aria-label={"edit"} icon={<EditIcon/>} onClick={() => history.push("/setting")}/>
        <Button>Follow</Button>
      </Stack>
    </Stack>
  )
}

export default function WrappedUserInfoCard(props) {
  return (
    <Suspense fallback={
      <Stack height={"100%"} width={"50%"} p={16} spacing={3}>
        <SkeletonCircle size="12"/>
        <Stack direction={"row"} align={"center"} spacing={4}>
          <Skeleton w={24} h={30}/>
          <Stack>
            <Skeleton w={40} h={30} colorScheme={"gray"} color={"gray"}/>
          </Stack>
        </Stack>
        <Skeleton h={30}/>
        <Spacer/>
        <Stack direction={"row"} spacing={3}>
          <Button>Follow</Button>
        </Stack>
      </Stack>
    }>
      <UserInfoCard {...props}/>
    </Suspense>
  )
}