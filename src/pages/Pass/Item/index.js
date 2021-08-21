import React, {Suspense} from "react";
import {useHistory} from "react-router-dom";
import {Box, SkeletonText} from "@chakra-ui/react";
import {useCurrentUserHook} from "../../../hooks/use-current-user.hook";

export function PassItem(){
  const history = useHistory()
  const [cu, loggedIn] = useCurrentUserHook()
  const id = history.location.pathname.slice(6)

  if (!loggedIn){
    return <PassItemSkeleton/>
  }

  return(
      <Box pl={4} pr={4} minH={"60vh"}>
        {id}
      </Box>
  )
}

export function PassItemSkeleton(){
  return(
    <Box pl={4} pr={4} minH={"60vh"}>
      <SkeletonText />
    </Box>
  )
}

export default function WrappedPassItem(){
  return(
    <Suspense fallback={<PassItemSkeleton/>}>
      <PassItem/>
    </Suspense>
  )
}