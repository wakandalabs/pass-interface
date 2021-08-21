import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
import WakandaStorefront from 0xWakandaStorefront

pub fun main(address: Address): Bool {
    return WakandaStorefront.check(address)
}
`

export function scriptIsStorefrontInit(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
