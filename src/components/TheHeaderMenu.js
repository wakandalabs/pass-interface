import {Button, Heading, Menu, MenuButton, MenuItem, MenuList, Stack} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import React from "react";
import {useHistory} from "react-router-dom";
import {useCurrentUserHook} from "../hooks/use-current-user.hook";

export function TheHeaderMenu() {
  const history = useHistory();
  const [cu] = useCurrentUserHook()

  return (
    <Stack direction={"row"}>
      <Button variant="ghost" onClick={() => history.push("/")}><Heading fontSize="md">Explore</Heading></Button>
      <Button variant="ghost" onClick={() => history.push("/" + cu.addr) }><Heading fontSize="md">My pass</Heading></Button>
      <Menu>
        <MenuButton as={Button} px={4} py={2} borderRadius="md" rightIcon={<ChevronDownIcon/>} variant="ghost">
          <Heading fontSize="md">Community</Heading>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => history.push("/wkdt")}><Heading fontSize="md" p={1}>WKDT Token</Heading></MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}

export default function WrappedTheHeaderMenu() {
  return(
    <TheHeaderMenu/>
  )
}