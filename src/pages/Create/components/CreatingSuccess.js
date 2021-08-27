import {Box, Button, Center, Heading, Stack, Text} from "@chakra-ui/react";
import React from "react";

export function CreatingSuccess({wakandapass}){
  function handleNextCreate(){
    wakandapass.resetTx()

  }

  return(
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Created Result</Heading>
        </Box>
        <Text>transaction Id: {wakandapass.tx.events[0].transactionId}</Text>
        <Button onClick={handleNextCreate}>Create Next Pass </Button>
      </Stack>
    </Center>
  )
}

export function CreatedError({wakandapass}){
  function handleNextCreate(){
    wakandapass.resetTx()
  }

  return(
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Created Error</Heading>
        </Box>
        <Button onClick={handleNextCreate}>Create Next Pass</Button>
      </Stack>
    </Center>
  )
}