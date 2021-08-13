import React from "react"
import {
  Button,
  Stack,
  Spacer,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {ChevronDownIcon} from "@chakra-ui/icons";

export function TheHeader() {
  const loggedIn = true
  const isDarkMode = useColorModeValue(false, true)
  const { toggleColorMode } = useColorMode()

  return (
    <Stack direction={"row"} p={4} h={20} bgColor={"transparent"} align={"center"} spacing={2}>
      <Logo h={10} bg={"white"} p={2}/>
      <Button variant="ghost">Explore</Button>
      <Button variant="ghost">My pass</Button>
      <Menu>
        <MenuButton as={Button} px={4} py={2} borderRadius="md" rightIcon={<ChevronDownIcon />} variant="ghost">
          Community
        </MenuButton>
        <MenuList>
          <MenuItem>WKDT Token</MenuItem>
        </MenuList>
      </Menu>
      <Button variant="ghost">Button</Button>
      <Spacer/>
      {loggedIn ? (
        <>
          <Button colorScheme="blue">Create</Button>
          <Menu isLazy={true}>
            <MenuButton as={Button} px={4} py={2} borderRadius="md">
              User
            </MenuButton>
            <MenuList>
              <MenuItem>My pass</MenuItem>
              <MenuItem>Edit profile</MenuItem>
              <MenuItem onClick={toggleColorMode}>
                <Box>Dark theme</Box>
                <Spacer/>
                <Switch isChecked={isDarkMode}/>
              </MenuItem>
              <MenuItem>Log out</MenuItem>
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