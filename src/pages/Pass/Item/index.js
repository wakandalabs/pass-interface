import React, {Suspense} from "react";

export function PassItem(){
  return(
    <>
      item
    </>
  )
}

export function PassItemSkeleton(){
  return(
    <>
    </>
  )
}

export default function WrappedPassItem(){
  return(
    <Suspense fallback={<PassItemSkeleton/>}>
      <PassItem/>
    </Suspense>
  )
}