import React, {Suspense} from "react";
import {Stack, Text} from "@chakra-ui/react";

export function Stamp({pass}){
  const stamps = pass.pass.stamps
  return (
    <Stack>
      {stamps.map(item => (
        <Text>{item}</Text>
      ))}
    </Stack>
  )
}

export function StampSkeleton(){
  return (
    <></>
  )
}

export default function WrappedStampSkeleton(props){
  return(
    <Suspense fallback={<StampSkeleton/>}>
      <Stamp {...props}/>
    </Suspense>
  )
}