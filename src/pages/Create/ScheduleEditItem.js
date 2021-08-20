import {Input, Stack} from "@chakra-ui/react";
import {useState} from "react";

export function ScheduleEditItem({index, items, callback}) {
  const [time, setTime] = useState("")
  const [percent, setPercent] = useState("")

  function handleKey(t) {
    setTime(t)
    items[index] = {"key": t, "value": percent}
    callback(items)
  }

  function handleValue(p) {
    setPercent(p)
    items[index] = {"key": time, "value": p}
    callback(items)
  }

  return (
    <Stack direction={"row"}>
      <Input id={"key"} placeholder="e.g. 2021.8.8" size="md" variant={"flushed"}
             onChange={(e) => handleKey(e.target.value)}/>
      <Input id={"value"} placeholder="e.g. 100% or 1.0" size="md" variant={"flushed"}
             onChange={(e) => handleValue(e.target.value)}/>
    </Stack>
  )
}

export default function WrappedScheduleEditItem(props) {
  return (
    <ScheduleEditItem {...props}/>
  )
}