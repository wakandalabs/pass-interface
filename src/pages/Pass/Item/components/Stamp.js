import React, {Suspense} from "react";
export function Stamp({pass}){
  return (
    <></>
  )
}

export function StampSkeleton(){
  return (
    <></>
  )
}

export default function WrappedStampSkeleton(props){
  return(
    <Suspense fallback={<StampSkeleton/>}>
      <Stamp {...props}/>
    </Suspense>
  )
}