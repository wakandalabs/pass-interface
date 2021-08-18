import {Input, Stack} from "@chakra-ui/react";

export function ScheduleEditItem() {
  return (
    <Stack direction={"row"}>
      <Input placeholder="e.g. 2021.8.8" size="md" variant={"flushed"}
             onChange={(event) => console.log(event.target.value) }/>
      <Input placeholder="e.g. 100% or 1.0" size="md" variant={"flushed"}
             onChange={(event) => console.log(event.target.value)}/>
    </Stack>
  )
}

export default function WrappedScheduleEditItem() {
  return (
    <ScheduleEditItem />
  )
}