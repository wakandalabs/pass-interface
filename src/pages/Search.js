import React from 'react';
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select
} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";

function Search() {
  return (
    <Box pl={16} pr={16}>
      <Box height={300}>
        <Center>
          Search
        </Center>
        <Center>
        </Center>
      </Box>
      <Center mt={-7}>
        <InputGroup width={"50%"} alignItems={"center"} h={14}>
          <InputLeftElement
            pointerEvents="none"
            h={"100%"}
            children={<Search2Icon color="gray.300" />}
          />
          <Input type="tel" placeholder="Search..." size="lg" bgColor={"white"} h={"100%"}/>
          <InputRightElement children={
            <Select variant="filled">
              <option value="Pass">Pass</option>
              <option value="User">User</option>
            </Select>
          } w={"auto"} h={"100%"} pr={2}/>
        </InputGroup>
      </Center>


    </Box>
  );
}

export default Search;
