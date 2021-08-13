import React from "react"
import {
  Button,
  Stack,
  Spacer,
  IconButton
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {Search2Icon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";
import {TheHeaderMenu} from "./TheHeaderMenu";
import {TheHeaderUserInfo} from "./TheHeaderUserInfo";

export function TheHeader() {
  const loggedIn = true
  const history = useHistory();

  return (
    <Stack direction={"row"} p={4} h={20} bgColor={"transparent"} align={"center"} spacing={2}>
      <Logo h={10} bg={"white"} p={2} borderRadius={"md"}/>
      <TheHeaderMenu/>
      <Spacer/>
      <Stack>
        <IconButton aria-label="Index" variant={"ghost"} icon={<Search2Icon />} onClick={() => history.push("/search")}/>
      </Stack>
      <Stack direction={"row"}>
        {loggedIn ? (
          <>
            <Button colorScheme="blue">Create</Button>
            <TheHeaderUserInfo/>
          </>
        ) : (
          <>
            <Button colorScheme="blue">Log In</Button>
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default function WrappedTheHeader() {
  return (
    <TheHeader/>
  )
}