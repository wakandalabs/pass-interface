import React, {Suspense} from 'react';
import {Box, Center, Spinner} from "@chakra-ui/react";
import {useCurrentUser} from "../../hooks/use-current-user";

export function Following() {
  const [cu, loggedIn] = useCurrentUser()

  if (!loggedIn) {
    return (
     <FollowingSkeleton />
    )
  }

  return (
    <Box pl={4} pr={4} minH={"60vh"}>
      Following
    </Box>
  );
}

export function FollowingSkeleton() {
  return (
    <Center minH={"60vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedFollowing() {
  return (
    <Suspense fallback={<FollowingSkeleton />}>
      <Following/>
    </Suspense>

  )
}

