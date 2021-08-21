import React, {Suspense} from "react";
import {Stack, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {parseDate} from "../../../../global/common";

export function Lockup({pass}){
  const schedule = Object.entries(pass.pass.lockupSchedule)

  return (
    <Stack spacing={6} mt={4}>
      <Table variant="simple">
        <TableCaption>Lockup schedule</TableCaption>
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th isNumeric>lockup</Th>
            <Th isNumeric>WKDT</Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedule.map((item,index) => (
            <Tr key={index}>
              <Td>
                <Text>{parseDate(Number(item[0] * 1000))}</Text>
              </Td>
              <Td isNumeric>{Number(item[1])*100} %</Td>
              <Td isNumeric>{Number(item[1]) * pass.pass.totalBalance}</Td>
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