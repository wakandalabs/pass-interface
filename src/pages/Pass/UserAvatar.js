import {Stack} from "@chakra-ui/react";
import React from "react";

export function UserAvatar({address}) {

  return (
    <Stack height={"100%"} width={"50%"} p={16} spacing={4} bgColor={"gray.200"}>
      {address}
    </Stack>
  )
}

export default function WrappedUserAvatar(props) {
  return (
    <UserAvatar {...props}/>
  )
}