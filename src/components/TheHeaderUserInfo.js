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
import {useCurrentUserHook} from "../hooks/use-current-user.hook";
import {AiOutlineEdit, AiOutlineLogout, AiOutlineSetting, AiOutlineWallet} from "react-icons/all";

export function TheHeaderUserInfo() {
  const history = useHistory();
  const [user, loggedIn, {logOut}] = useCurrentUserHook()

  return (
    <Stack>
      <Menu isLazy={true}>
        <MenuButton as={Button} px={4} py={2} borderRadius="md">
          {user.addr}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => window.location.href = "https://pocket.wakanda.cn"}>
            <Stack direction={"row"} align={"center"} p={2} spacing={4}>
              <AiOutlineWallet/>
              <Heading fontSize="md">My pocket</Heading>
            </Stack>
          </MenuItem>
          <MenuItem onClick={() => history.push("/initialize")}>
            <Stack direction={"row"} align={"center"} p={2} spacing={4}>
              <AiOutlineSetting/>
              <Heading fontSize="md">Initialize account</Heading>
            </Stack>
          </MenuItem>
          <MenuItem onClick={() => history.push("/setting")}>
            <Stack direction={"row"} align={"center"} p={2} spacing={4}>
              <AiOutlineEdit/>
              <Heading fontSize="md">Edit profile</Heading>
            </Stack>
          </MenuItem>
          <MenuItem>
            <Stack direction={"row"} align={"center"} p={2} spacing={4}>
              <AiOutlineLogout/>
              <Heading fontSize="md" onClick={logOut}>Log out</Heading>
            </Stack>
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}

export default function WrappedTheHeaderUserInfo() {
  const [user] = useCurrentUserHook()

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