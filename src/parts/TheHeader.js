import React from "react";
import {
  Button,
  Stack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {Search2Icon} from "@chakra-ui/icons";
import {useHistory} from "react-router-dom";
import TheHeaderMenu from "./TheHeaderMenu";
import TheHeaderUserInfo from "./TheHeaderUserInfo";
import {ColorModeSwitcher} from "./ColorModeSwitcher";
import {useCurrentUser} from "../hooks/use-current-user";

export function TheHeader(props) {
  const history = useHistory();
  const [user, loggedIn, {logIn}] = useCurrentUser()

  return (
    <Stack direction={"row"} p={4} h={20} bgColor={"transparent"} align={"center"} spacing={3} position={"fixed"}
           w={"100%"} top={0} left={0} zIndex={9} backdropFilter={"blur(8px)"} {...props}>
      <Logo h={10} bg={"white"} p={2} borderRadius={"md"}/>
      <TheHeaderMenu/>
      <Spacer/>
      <Stack direction={"row"}>
        <IconButton aria-label="Index" variant={"ghost"} icon={<Search2Icon/>} onClick={() => history.push("/search")}/>
        <ColorModeSwitcher/>
      </Stack>
      <Stack direction={"row"} spacing={3}>
        {loggedIn ? (
          <>
            <Button colorScheme="blue">Create</Button>
            <TheHeaderUserInfo/>
          </>
        ) : (
          <Button colorScheme="blue" onClick={logIn}>Log In</Button>
        )}
      </Stack>
    </Stack>
  )
}

export default function WrappedTheHeader(props) {
  return (
    <TheHeader {...props}/>
  )
}