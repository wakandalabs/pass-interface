import {send, decode, script, cdc, args} from "@onflow/fcl";

const CODE = cdc`
import WakandaToken from 0xWakandaToken

pub fun main(): UFix64 {
    let supply = WakandaToken.totalSupply
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