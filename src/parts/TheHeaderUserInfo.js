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

export function TheHeaderUserInfo() {
  const history = useHistory();

  return (
    <Menu isLazy={true}>
      <MenuButton as={Button} px={4} py={2} borderRadius="md">
        Address
      </MenuButton>
      <MenuList>
        <Stack m={3} spacing={2}>
          <Heading fontSize="md">Address</Heading>
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
        <MenuItem isDisabled={true}>
          <Heading fontSize="md">Edit profile</Heading>
        </MenuItem>
        <MenuItem><Heading fontSize="md">Log out</Heading></MenuItem>
      </MenuList>
    </Menu>
  )
}

export default function WrappedTheHeaderUserInfo() {
  return (
    <TheHeaderUserInfo/>
  )
}