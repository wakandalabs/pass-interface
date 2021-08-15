import {send, decode, script, cdc, args} from "@onflow/fcl";

const CODE = cdc`
import Vibranium from 0xVibranium

pub fun main(): UFix64 {
    let supply = Vibranium.totalSupply
    return supply
}
`

export function fetchWkdtSupply() {
  // prettier-ignore
  return send([
    script(CODE),
    args([])
  ]).then(decode)
}