import React from "react"
import {
  Button,
  Stack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  useColorMode,
  useColorModeValue, Heading, MenuDivider, IconButton
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {ChevronDownIcon, Search2Icon} from "@chakra-ui/icons";

export function TheHeader() {
  const loggedIn = true
  const isDarkMode = useColorModeValue(false, true)
  const {toggleColorMode} = useColorMode()

  return (
    <Stack direction={"row"} p={4} h={20} bgColor={"transparent"} align={"center"} spacing={2}>
      <Logo h={10} bg={"white"} p={2} borderRadius={"md"}/>
      <Button variant="ghost"><Heading size="sm">Explore</Heading></Button>
      <Button variant="ghost"><Heading size="sm">My pass</Heading></Button>
      <Button variant="ghost"><Heading size="sm">Following</Heading></Button>
      <Menu>
        <MenuButton as={Button} px={4} py={2} borderRadius="md" rightIcon={<ChevronDownIcon/>} variant="ghost">
          <Heading size="sm">Community</Heading>
        </MenuButton>
        <MenuList>
          <MenuItem><Heading size="xs" p={1}>WKDT Token</Heading></MenuItem>
          <MenuItem><Heading size="xs" p={1}>Voting</Heading></MenuItem>
          <MenuItem><Heading size="xs" p={1}>Suggest feature</Heading></MenuItem>
        </MenuList>
      </Menu>
      <Spacer/>
      <IconButton aria-label="Search" variant={"ghost"} icon={<Search2Icon />} />
      {loggedIn ? (
        <>
          <Button colorScheme="blue">Create</Button>
          <Menu isLazy={true}>
            <MenuButton as={Button} px={4} py={2} borderRadius="md">
              Address
            </MenuButton>
            <MenuList>
              <Stack m={3} spacing={3}>
                <Heading size="sm">Address</Heading>
                <Stack>
                  <Heading size="xs" color={"gray"}>My balance</Heading>
                  <Heading size="sm">200 WKDT</Heading>
                </Stack>
                <Stack>
                  <Heading size="xs" color={"gray"}>My locked balance</Heading>
                  <Heading size="sm">200 WKDT</Heading>
                </Stack>
              </Stack>
              <MenuDivider />
              <MenuItem>
                <Heading size="sm">My pass</Heading>
              </MenuItem>
              <MenuItem isDisabled={true}>
                <Heading size="sm">Edit profile</Heading>
              </MenuItem>
              <MenuItem onClick={toggleColorMode} closeOnSelect={false}>
                <Heading size="sm">Dark theme</Heading>
                <Spacer/>
                <Switch isChecked={isDarkMode}/>
              </MenuItem>
              <MenuItem><Heading size="sm">Log out</Heading></MenuItem>
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