import React from 'react';
import {Box, Button, Center, Heading, Stack} from "@chakra-ui/react";
import {useCurrentUser} from "../../hooks/use-current-user";

export function Following() {
  const [user, loggedIn, {logIn}] = useCurrentUser()

  if (!loggedIn) {
    return (
      <Center>
        <Stack pl={4} pr={4} spacing={3} w={650}>
          <Heading>My following</Heading>
          <Heading fontSize={"md"}>Welcome to the world of wakanda!</Heading>
          <Heading fontSize={"md"}>You can follow other people interesting!</Heading>
          <Box>
            <Button onClick={logIn}>Log In</Button>
          </Box>
        </Stack>
      </Center>
    )
  }

  return (
    <Box pl={4} pr={4}>
      Following
    </Box>
  );
}

export default function WrappedFollowing() {
  return (
    <Following/>
  )
}