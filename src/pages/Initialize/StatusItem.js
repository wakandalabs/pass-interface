import {Heading, Spacer, Stack} from "@chakra-ui/react";
import {IDLE, PROCESSING} from "../../global/constants";
import {CheckCircleIcon, WarningTwoIcon} from "@chakra-ui/icons";
import {BeatLoader} from "react-spinners";

export function StatusItem({status, name, item}) {
  return (
    <Stack direction={"row"} align={"center"} h={8}>
      <Heading fontSize={"md"}>{name}</Heading>
      <Spacer/>
      {(status === PROCESSING) && (
        <BeatLoader size={6}/>
      )}
      {(status === IDLE) && item && (
        <CheckCircleIcon size={"sm"}/>
      )}
      {(status === IDLE) && !item && (
        <WarningTwoIcon size={"sm"}/>
      )}
    </Stack>
  )
}

export default function WrappedStatusItem(props) {
  return(
    <StatusItem {...props}/>
  )
}

