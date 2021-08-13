import React from "react"
import {
  Button,
  Stack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue, Heading, MenuDivider, IconButton
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {ChevronDownIcon, Search2Icon} from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

export function TheHeader() {
  const loggedIn = true
  const isDarkMode = useColorModeValue(false, true)
  const {toggleColorMode} = useColorMode()
  const history = useHistory();

  return (
    <Stack direction={"row"} p={4} h={20} bgColor={"transparent"} align={"center"} spacing={2}>
      <Logo h={10} bg={"white"} p={2} borderRadius={"md"}/>
      <Button variant="ghost" onClick={() => history.push("/")}><Heading fontSize="md">Explore</Heading></Button>
      <Button variant="ghost" onClick={() => history.push("/pass")}><Heading fontSize="md">My pass</Heading></Button>
      <Button variant="ghost" onClick={() => history.push("/following")}><Heading fontSize="md">Following</Heading></Button>
      <Menu>
        <MenuButton as={Button} px={4} py={2} borderRadius="md" rightIcon={<ChevronDownIcon/>} variant="ghost">
          <Heading fontSize="md">Community</Heading>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => history.push("/wkdt")}><Heading fontSize="md" p={1}>WKDT Token</Heading></MenuItem>
          <MenuItem><Heading fontSize="md" p={1}>Voting</Heading></MenuItem>
          <MenuItem><Heading fontSize="md" p={1}>Suggest feature</Heading></MenuItem>
        </MenuList>
      </Menu>
      <Spacer/>
      <IconButton aria-label="Index" variant={"ghost"} icon={<Search2Icon />} onClick={() => history.push("/search")}/>
      {loggedIn ? (
        <>
          <Button colorScheme="blue">Create</Button>
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
              <MenuItem onClick={toggleColorMode} closeOnSelect={false}>
                <Heading fontSize="md">{isDarkMode ? "Light" : "Dark"} theme</Heading>
              </MenuItem>
              <MenuItem><Heading fontSize="md">Log out</Heading></MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Button colorScheme="blue">Log In</Button>
        </>
      )}
    </Stack>
  )
}

export default function WrappedTheHeader() {
  return (
    <TheHeader/>
  )
}