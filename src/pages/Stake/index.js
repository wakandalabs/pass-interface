import React, {Suspense} from "react";
export function Stake(){
  return(
    <></>
  )
}

export function StakeSkeleton(){
  return(
    <></>
  )
}

export default function WrappedStake(){
  return(
    <Suspense fallback={<StakeSkeleton/>}>
      <Stake/>
    </Suspense>
  )
}