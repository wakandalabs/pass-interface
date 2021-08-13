import {Avatar, Button, Heading, Spacer, Stack, Text, useClipboard} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import React from "react";

export function UserInfoCard({address}) {
  const {hasCopied, onCopy} = useClipboard(address)

  return (
    <Stack height={"100%"} width={"50%"} p={16} spacing={4}>
      <Avatar bg="teal.500"/>
      <Stack direction={"row"} align={"center"} spacing={2}>
        <Heading fontSize="xl">@ID</Heading>
        <Stack>
          <Button size={"xs"} onClick={onCopy} width={36} colorScheme={"gray"} color={"gray"}>
            {hasCopied ? "Copied!" :  address }
          </Button>
        </Stack>
      </Stack>
      <Text>DESC</Text>
      <Spacer/>
      <Button leftIcon={<SmallAddIcon/>} width={28}>Follow</Button>
    </Stack>
  )
}

export default function WrappedUserInfoCard() {
  return (
    <UserInfoCard/>
  )
}