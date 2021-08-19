import {Button, Heading, Spacer, Stack} from "@chakra-ui/react";
import {IDLE, PROCESSING} from "../../global/constants";
import {BeatLoader} from "react-spinners";
import {CheckCircleIcon} from "@chakra-ui/icons";
import React from "react";

export function StatusItem({name, init}) {
  return(
    <Stack direction={"row"} align={"center"} h={8}>
      <Heading fontSize={"md"}>{name}</Heading>
      <Spacer/>
      {(init.status === PROCESSING) && (
        <BeatLoader size={6}/>
      )}
      {(init.status === IDLE) && init.isInitialized && (
        <CheckCircleIcon size={"sm"}/>
      )}
      {(init.status === IDLE) && !init.isInitialized && (
        <Button colorScheme={"red"} onClick={init.initialize}>Init</Button>
      )}
    </Stack>
  )
}

export default function WrappedStatusItem(props) {
  return(
    <StatusItem {...props}/>
  )
}