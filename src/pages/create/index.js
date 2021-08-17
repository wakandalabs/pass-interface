import {Box, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";

export function Create(){
  return (
    <Box pl={4} pr={4} minH={"60vh"}>
      Create
    </Box>
  )
}

export function CreateSkeleton(){
  return (
    <Center minH={"60vh"}>
      <Spinner />
    </Center>
  )
}

export default function WrappedCreate(){
  return(
    <Suspense fallback={<CreateSkeleton/>}>
      <Create/>
    </Suspense>
  )
}