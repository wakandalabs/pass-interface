import {Box, Input, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {parse} from "qs";

export function ScheduleEditItem({index, items, callback}) {
  const [date, setDate] = useState("")
  const [percent, setPercent] = useState("")

  function handleDate(date) {
    setDate(date)
    items[index] = {"key": date, "value": percent}
    callback(items)
  }

  function handleValue(p) {
    setPercent(p)
    items[index] = {"key": date, "value": p}
    callback(items)
  }

  return (
    <Stack direction={"row"}>
      <Box w={"50%"}>
        <Input id={"key"} placeholder="e.g. 2022.12.31 0:0:0" size="md" variant={"flushed"}
               onChange={(e) => handleDate(e.target.value)}/>
        <Text fontSize={"xs"} color={"gray"}>{"(" + Date.parse(date) + ")"}</Text>
      </Box>
      <Box w={"50%"}>
        <Input id={"value"} placeholder="e.g. 100% or 1.0" size="md" variant={"flushed"}
               onChange={(e) => handleValue(e.target.value)}/>
        <Text fontSize={"xs"} color={"gray"}>{"(" + Number(percent) + ")"}</Text>
      </Box>
    </Stack>
  )
}

export default function WrappedScheduleEditItem(props) {
  return (
    <ScheduleEditItem {...props}/>
  )
}