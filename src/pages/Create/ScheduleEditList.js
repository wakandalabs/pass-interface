import {Stack} from "@chakra-ui/react";
import React, {useState} from "react";
import {ScheduleEditItem} from "./ScheduleEditItem";

export function ScheduleEditList() {
  const [result, setResult] = useState([{"key": "", "value": ""}])

  const callback = (items) => {
    setResult(items)
    let check = []
    for (const item of result) {
      if (item["key"] === "" || item["value"] === "") {
        check.push(false)
      }else{
        check.push(true)
      }
    }
    if (check.find(item => !item) === undefined) {
      const r = [...result]
      r.push({"key": "", "value": ""})
      setResult(r)
    }
  }

  return (
    <Stack>
      {result.map((item, index) => (
        <ScheduleEditItem key={index} index={index} items={result} callback={callback}/>
      ))}
    </Stack>
  )
}

export default function WrappedScheduleEditList() {
  return (
    <ScheduleEditList/>
  )
}