import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address} from "@onflow/types";

const CODE = cdc`
import NonFungibleToken from 0xNonFungibleToken
import WakandaPass from 0xWakandaPass

pub fun main(address: Address): [WakandaPass.ReadOnly] {
    return WakandaPass.readMultiple(address)
}
`

export function fetchWakandaPassList(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
