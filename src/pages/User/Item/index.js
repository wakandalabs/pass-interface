import React, {Suspense} from "react";

export function UserPassItem(){
  return(
    <>
      item
    </>
  )
}

export function UserPassItemSkeleton(){
  return(
    <>
    </>
  )
}

export default function WrappedUserPassItem(){
  return(
    <Suspense fallback={<UserPassItemSkeleton/>}>
      <UserPassItem />
    </Suspense>
  )
}