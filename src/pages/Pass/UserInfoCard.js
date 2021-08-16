import {Avatar, Button, Heading, Spacer, Stack, Text, useClipboard} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import React, {Suspense} from "react";
import {useWakandaProfile} from "../../hooks/use-wakanda-profile";

export function UserInfoCard({address}) {
  const {hasCopied, onCopy} = useClipboard(address)
  const profile = useWakandaProfile(address)

  console.log(profile)

  return (
    <Stack height={"100%"} width={"50%"} p={16} spacing={4}>
      <Avatar bg="teal.500" src={profile.profile.avatar}/>
      <Stack direction={"row"} align={"center"} spacing={2}>
        <Heading fontSize="xl">{profile.profile.name}</Heading>
        <Stack>
          <Button size={"xs"} onClick={onCopy} width={36} colorScheme={"gray"} color={"gray"}>
            {hasCopied ? "Copied!" :  address }
          </Button>
        </Stack>
      </Stack>
      <Text>{profile.profile.info}</Text>
      <Spacer/>
      {/*<Button leftIcon={<SmallAddIcon/>} width={28}>Follow</Button>*/}
    </Stack>
  )
}

export default function WrappedUserInfoCard(props) {
  return (
    <Suspense fallback={null}>
      <UserInfoCard {...props}/>
    </Suspense>
  )
}