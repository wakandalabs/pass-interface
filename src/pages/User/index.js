import React, {Suspense} from "react";

export function UserPass(){
  return(
    <>
      User Pass
    </>
  )
}

export function UserPassSkeleton(){
  return(
    <>
    </>
  )
}

export default function WrappedPassItem(){
  return(
    <Suspense fallback={<UserPassSkeleton/>}>
      <UserPass />
    </Suspense>
  )
}