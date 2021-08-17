import {Center, Spinner, Stack} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function UserAvatar({address}) {
  return (
    <Stack height={"100%"} width={"50%"} p={16} spacing={3}>
      {address}
    </Stack>
  )
}

export function UserAvatarSkeleton() {
  return (
    <Stack height={"100%"} width={"50%"} p={16} spacing={3}>
      <Center>
        <Spinner/>
      </Center>
    </Stack>
  )
}

export default function WrappedUserAvatar(props) {
  return (
    <Suspense fallback={<UserAvatarSkeleton/>}>
      {/*<UserAvatar {...props}/>*/}
      <UserAvatarSkeleton/>
    </Suspense>
  )
}