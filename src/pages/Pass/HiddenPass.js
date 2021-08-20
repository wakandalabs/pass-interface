import {Stack, Center, Spinner} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaPass} from "../../hooks/use-pass.hook";

export function HiddenPass({address}) {
  const wakandapass = useWakandaPass(address)

  return (
    <Stack>
      {/*<WakandaPassList/>*/}
    </Stack>
  )
}

export function HiddenPassSkeleton() {
  return (
    <Center h={"50vh"}>
      <Spinner />
    </Center>
  )
}


export default function WrappedHiddenPass(props) {
  return (
    <Suspense fallback={<HiddenPassSkeleton/>}>
      <HiddenPass {...props}/>
    </Suspense>
  )
}