import {Box, Button, Center, Divider, Heading, Spacer, Stack} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import {useInitialized} from "../../hooks/use-initialized";
import {useCurrentUser} from "../../hooks/use-current-user";
import {IDLE} from "../../global/constants";
import {Suspense} from "react";

export function Initialize(){
  const [cu] = useCurrentUser()
  // const init = useInitialized(cu.addr)

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={4} w={650}>
        <Heading>Initialize account</Heading>
        <Divider/>
        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"md"}>WakandaToken</Heading>
          <Spacer/>
          <BeatLoader size={8}/>
        </Stack>

        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"md"}>WakandaPass</Heading>
          <Spacer/>
          <BeatLoader size={8}/>
        </Stack>

        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"md"}>WakandaProfile</Heading>
          <Spacer/>
          <BeatLoader size={8}/>
        </Stack>

        <Divider/>
        {/*<Button disabled={init.status !== IDLE} onClick={init.initialize}>Initialize</Button>*/}
      </Stack>
    </Center>
  )
}

export default function WrappedInitialize(){
  return (
    <Suspense fallback={null}>
      <Initialize/>
    </Suspense>
  )
}