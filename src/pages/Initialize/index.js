import {Button, Center, Divider, Heading, Spacer, Stack} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";

export function Initialize(){
  return (
    <Center>
      <Stack pl={4} pr={4} spacing={4} w={650}>
        <Heading>Initialize account</Heading>
        <Divider/>
        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"md"}>WakandaToken</Heading>
          <Spacer/>
          <Button isLoading size={"sm"} spinner={<BeatLoader size={8} color="white" />}>Setup</Button>
        </Stack>

        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"md"}>WakandaPass</Heading>
          <Spacer/>
          <Button isLoading size={"sm"} spinner={<BeatLoader size={8} color="white" />}>Setup</Button>
        </Stack>

        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"md"}>WakandaPassStamp</Heading>
          <Spacer/>
          <Button isLoading size={"sm"} spinner={<BeatLoader size={8} color="white" />}>Setup</Button>
        </Stack>

        <Stack direction={"row"} align={"center"}>
          <Heading fontSize={"md"}>WakandaProfile</Heading>
          <Spacer/>
          <Button isLoading size={"sm"} spinner={<BeatLoader size={8} color="white" />}>Setup</Button>
        </Stack>

      </Stack>
    </Center>
  )
}

export default function WrappedInitialize(){
  return (
    <Initialize/>
  )
}