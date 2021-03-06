import React, {Suspense} from 'react';
import {
  Box,
  Center, Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select, Spinner, Stack
} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import {TheFooter} from "../../components/TheFooter";

export function Search() {
  return (
    <Box pl={4} pr={4} minH={"60vh"}>
      <Center height={300}>
        <Stack align={"center"} spacing={3}>
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
          <Input placeholder="Search..." size="lg" h={"100%"} variant={"filled"}/>
          <InputRightElement children={
            <Select variant="outline">
              <option value="Index">Pass</option>
              <option value="User">User</option>
            </Select>
          } w={"auto"} h={"100%"} pr={2}/>
        </InputGroup>
      </Center>
    </Box>
  );
}

export function SearchSkeleton() {
  return (
    <Center minH={"60vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedSearch() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <Search/>
      <TheFooter/>
    </Suspense>
  )
}
