import React, {Suspense} from "react";
import {Divider, Stack, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {fmtWkdt} from "../../../../util/fmt-wkdt";
import {parseDate} from "../../../../global/common";

export function Lockup({pass}){
  const schedule = Object.entries(pass.pass.lockupSchedule)

  return (
    <Stack spacing={6} mt={4}>
      <Text fontWeight={"bold"} fontSize={"sm"}>Lockup
        amount: {fmtWkdt(pass.pass.lockupAmount, false)} / {fmtWkdt(pass.pass.totalBalance, true)}</Text>
      <Divider/>
      <Table variant="simple">
        <TableCaption>Lockup schedule</TableCaption>
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>lockup</Th>
            <Th isNumeric>WKDT</Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedule.map((item) => (
            <Tr>
              <Td>
                <Text>{parseDate(Number(item[0] * 1000))}</Text>
              </Td>
              <Td>{Number(item[1])}</Td>
              <Td isNumeric>0</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
}

export function LockupSkeleton(){
  return (
    <></>
  )
}

export default function WrappedLockupSkeleton(props){
  return(
    <Suspense fallback={<LockupSkeleton/>}>
      <Lockup {...props}/>
    </Suspense>
  )
}