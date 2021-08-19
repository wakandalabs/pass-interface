import {Stack} from "@chakra-ui/react";
import React from "react";

export function ScheduleEditList() {
  const [scheduleList, setScheduleList] = React.useState([{"key": 0.0, "value": 0.0}])

  return (
    <Stack>
      {scheduleList.map((item, index) => {
        console.log(item.key, index)
      })}
    </Stack>
  )
}

export default function WrappedScheduleEditList() {
  return (
    <ScheduleEditList />
  )
}