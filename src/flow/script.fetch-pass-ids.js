import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address} from "@onflow/types";

const CODE = cdc`
import NonFungibleToken from 0xNonFungibleToken
import WakandaPass from 0xWakandaPass

pub fun main(address: Address): [UInt64] {
    return WakandaPass.fetch(address).getIDs()
}
`

export function fetchWakandaPassIds(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
