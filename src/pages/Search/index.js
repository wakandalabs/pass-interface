import React from 'react';
import {
  Box,
  Center, Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select, Stack
} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";

export function Search() {
  return (
    <Box pl={4} pr={4}>
      <Center height={300}>
        <Stack align={"center"} spacing={2}>
          <Heading size={"2xl"}>Search World</Heading>
          <Heading size={"md"}>of Wakanda</Heading>
        </Stack>
      </Center>
      <Center mt={-7}>
        <InputGroup maxW={600} alignItems={"center"} h={14}>
          <InputLeftElement
            pointerEvents="none"
            h={"100%"}
            children={<Search2Icon color="gray.300" />}
          />
          <Input placeholder="Search..." size="lg" bgColor={"white"} h={"100%"}/>
          <InputRightElement children={
            <Select variant="filled">
              <option value="Index">Index</option>
              <option value="User">User</option>
            </Select>
          } w={"auto"} h={"100%"} pr={2}/>
        </InputGroup>
      </Center>
    </Box>
  );
}

export default function WrappedSearch() {
  return (
    <Search/>
  )
}
