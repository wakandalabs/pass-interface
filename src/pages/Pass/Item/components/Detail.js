import React, {Suspense} from "react";
import {Stack, Text} from "@chakra-ui/react";

export function Detail({pass}){
  return (
    <Stack mt={4}>
      <Text fontWeight={"bold"} fontSize={"sm"}>Owner: {pass.pass.owner}</Text>
    </Stack>
  )
}

export function DetailSkeleton(){
  return (
    <></>
  )
}

export default function WrappedDetailSkeleton(props){
  return(
    <Suspense fallback={<DetailSkeleton/>}>
      <Detail {...props}/>
    </Suspense>
  )
}