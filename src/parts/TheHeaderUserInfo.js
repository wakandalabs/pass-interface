import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import {useHistory} from "react-router-dom";
import {useCurrentUser} from "../hooks/use-current-user";

export function TheHeaderUserInfo() {
  const history = useHistory();
  const [user, loggedIn, {logOut}] = useCurrentUser()

  return (
    <Menu isLazy={true}>
      <MenuButton as={Button} px={4} py={2} borderRadius="md">
        {user.addr}
      </MenuButton>
      <MenuList>
        <Stack m={3} spacing={2}>
          <Heading fontSize="md">{user.addr}</Heading>
          <Stack>
            <Heading fontSize="xs" color={"gray"}>My balance</Heading>
            <Heading fontSize="sm">200 WKDT</Heading>
          </Stack>
          <Stack>
            <Heading fontSize="xs" color={"gray"}>My locked balance</Heading>
            <Heading fontSize="sm">200 WKDT</Heading>
          </Stack>
        </Stack>
        <MenuDivider />
        <MenuItem onClick={() => history.push("/wallet")}>
          <Heading fontSize="md">My wallet</Heading>
        </MenuItem>
        <MenuItem>
          <Heading fontSize="md">Edit profile</Heading>
        </MenuItem>
        <MenuItem><Heading fontSize="md" onClick={logOut}>Log out</Heading></MenuItem>
      </MenuList>
    </Menu>
  )
}

export default function WrappedTheHeaderUserInfo() {
  return (
    <TheHeaderUserInfo/>
  )
}