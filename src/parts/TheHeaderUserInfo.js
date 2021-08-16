import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList, Spinner,
  Stack,
} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useHistory} from "react-router-dom";
import {useCurrentUser} from "../hooks/use-current-user";
import {useWkdtBalance} from "../hooks/use-wkdt-balance";
import {IDLE} from "../global/constants";

export function TheHeaderUserInfo() {
  const history = useHistory();
  const [user, loggedIn, {logOut}] = useCurrentUser()
  const wkdt = useWkdtBalance(user.addr)

  console.log(wkdt)

  return (
    <Menu isLazy={true}>
      <MenuButton as={Button} px={4} py={2} borderRadius="md">
        {user.addr}
      </MenuButton>
      <MenuList>
        <Stack ml={3} mr={3} spacing={2}>
          <Stack>
            <Heading fontSize="xs" color={"gray"}>My balance</Heading>
            <Heading fontSize="sm">
              {(wkdt.status !== IDLE || wkdt.status !== IDLE) && (
                  <Spinner size="sm"/>
              )}
              WKDT</Heading>
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
        <MenuItem onClick={() => history.push("/initialize")}>
          <Heading fontSize="md">Initialize</Heading>
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
    <Suspense fallback={null}>
      <TheHeaderUserInfo/>
    </Suspense>
  )
}