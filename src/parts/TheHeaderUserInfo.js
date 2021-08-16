import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, Spinner, Stack,
} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useHistory} from "react-router-dom";
import {useCurrentUser} from "../hooks/use-current-user";

export function TheHeaderUserInfo() {
  const history = useHistory();
  const [user, loggedIn, {logOut}] = useCurrentUser()

  return (
    <Stack>
      <Menu isLazy={true}>
        <MenuButton as={Button} px={4} py={2} borderRadius="md">
          {user.addr}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => history.push("/wallet")}>
            <Heading fontSize="md">My wallet</Heading>
          </MenuItem>
          <MenuItem onClick={() => history.push("/initialize")}>
            <Heading fontSize="md">Initialize</Heading>
          </MenuItem>
          <MenuItem onClick={() => history.push("/setting")}>
            <Heading fontSize="md">Edit profile</Heading>
          </MenuItem>
          <MenuItem><Heading fontSize="md" onClick={logOut}>Log out</Heading></MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}

export default function WrappedTheHeaderUserInfo() {
  const [user] = useCurrentUser()

  return (
    <Suspense fallback={
      <Menu isLazy={true}>
        <MenuButton as={Button} px={4} py={2} borderRadius="md">
          {user.addr}
        </MenuButton>
        <MenuList>
          <Spinner/>
        </MenuList>
      </Menu>
    }>
      <TheHeaderUserInfo/>
    </Suspense>
  )
}